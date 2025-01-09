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


async def update_rocket(
    db: AsyncSession, rocket_id: int, rocket_data: RocketCreate
):
    rocket = await get_rocket_by_id(db, rocket_id)
    if not rocket:
        return None

    rocket.name = rocket_data.name
    rocket.no_stages = rocket_data.no_stages
    rocket.height = rocket_data.height
    rocket.mass = rocket_data.mass
    rocket.diameter = rocket_data.diameter
    rocket.description = rocket_data.description
    rocket.launches_count = rocket_data.launches_count
    rocket.successful_launches_count = rocket_data.successful_launches_count
    rocket.failed_launches_count = rocket_data.failed_launches_count
    rocket.landings_count = rocket_data.landings_count
    rocket.successful_landings_count = rocket_data.successful_landings_count
    rocket.failed_landings_count = rocket_data.failed_landings_count
    rocket.pending_launches = rocket_data.pending_launches
    rocket.leo_capacity = rocket_data.leo_capacity
    rocket.gto_capacity = rocket_data.gto_capacity
    rocket.geo_capacity = rocket_data.geo_capacity
    rocket.sso_capacity = rocket_data.sso_capacity
    rocket.rocket_thrust = rocket_data.rocket_thrust
    rocket.launch_cost = rocket_data.launch_cost
    rocket.image_url = rocket_data.image_url
    rocket.agency_id = rocket_data.agency_id

    await db.commit()
    await db.refresh(rocket)
    return rocket
