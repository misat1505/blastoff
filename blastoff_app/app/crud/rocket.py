from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import joinedload

from app.models import Agency, Rocket
from app.redis import RedisClient, RedisKeys
from app.schemas import RocketCreate, RocketResponse


async def create_rocket(
    db: AsyncSession, rocket_data: RocketCreate
) -> RocketResponse:
    db_rocket = Rocket(**rocket_data.model_dump())
    db.add(db_rocket)
    await db.commit()
    await db.refresh(db_rocket)
    return db_rocket


async def get_rocket_by_id(db: AsyncSession, rocket_id: int) -> RocketResponse:
    result = await db.execute(select(Rocket).filter(Rocket.id == rocket_id))
    rocket = result.scalar_one_or_none()
    if rocket is None:
        raise HTTPException(status_code=404, detail="Rocket not found")
    return rocket


async def get_all_rockets(db: AsyncSession) -> list[RocketResponse]:
    result = await db.execute(select(Rocket))
    rockets = result.scalars().all()
    return rockets


async def delete_rocket(db: AsyncSession, rocket_id: int):
    rocket = await get_rocket_by_id(db, rocket_id)
    if not rocket:
        return None
    await db.delete(rocket)
    await db.commit()
    return rocket


async def get_detailed_rocket_by_id(
    db: AsyncSession, redis: RedisClient, rocket_id: int
):
    cached_rocket = await redis.get_cache(RedisKeys.rocket_details(rocket_id))

    if cached_rocket:
        return cached_rocket

    result = await db.execute(
        select(Rocket)
        .join(Agency, Agency.id == Rocket.agency_id)
        .where(Rocket.id == rocket_id)
        .options(joinedload(Rocket.agency))
    )

    rocket = result.scalar_one_or_none()

    await redis.set_cache(RedisKeys.rocket_details(rocket_id), rocket)

    return rocket
