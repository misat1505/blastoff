from datetime import datetime, timezone

from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import joinedload

from app.models import Agency, Launch, Rocket, Site
from app.redis import RedisClient, RedisKeys
from app.schemas import LaunchCreate, LaunchResponse


async def create_launch(
    db: AsyncSession, launch_data: LaunchCreate
) -> LaunchResponse:
    db_launch = Launch(**launch_data.model_dump())
    db.add(db_launch)
    await db.commit()
    await db.refresh(db_launch)
    return db_launch


async def get_launch_by_id(db: AsyncSession, launch_id: str) -> LaunchResponse:
    result = await db.execute(select(Launch).filter(Launch.id == launch_id))
    launch = result.scalar_one_or_none()
    return launch


async def get_all_launches(db: AsyncSession) -> list[LaunchResponse]:
    result = await db.execute(select(Launch))
    launches = result.scalars().all()
    return launches


async def delete_launch(db: AsyncSession, launch_id: str):
    launch = await get_launch_by_id(db, launch_id)
    if not launch:
        return None
    await db.delete(launch)
    await db.commit()
    return launch


async def get_future_launches_sorted(db: AsyncSession, redis: RedisClient):
    cached_launches = await redis.get_cache(RedisKeys.future_launches())

    if cached_launches:
        return cached_launches

    current_time = datetime.now(timezone.utc)

    result = await db.execute(
        select(Launch)
        .join(Rocket, Rocket.id == Launch.rocket_id)
        .join(Agency, Agency.id == Rocket.agency_id)
        .join(Site, Site.id == Launch.site_id)
        .where(Launch.date > current_time)
        .order_by(Launch.date.asc())
        .options(
            joinedload(Launch.rocket).joinedload(Rocket.agency),
            joinedload(Launch.site),
        )
    )

    launches = result.scalars().all()

    await redis.set_cache(RedisKeys.future_launches(), launches)

    return launches


async def get_detailed_launch(
    db: AsyncSession, redis: RedisClient, launch_id: str
):
    cached_launch = await redis.get_cache(RedisKeys.launch_details(launch_id))

    if cached_launch:
        return cached_launch

    result = await db.execute(
        select(Launch)
        .join(Rocket, Rocket.id == Launch.rocket_id)
        .join(Agency, Agency.id == Rocket.agency_id)
        .join(Site, Site.id == Launch.site_id)
        .where(Launch.id == launch_id)
        .options(
            joinedload(Launch.rocket).joinedload(Rocket.agency),
            joinedload(Launch.site),
        )
    )
    launch = result.scalars().first()

    await redis.set_cache(RedisKeys.launch_details(launch_id), launch)

    return launch


async def update_launch(
    db: AsyncSession, launch_id: int, launch_data: LaunchCreate
):
    launch = await get_launch_by_id(db, launch_id)
    if not launch:
        return None

    launch.last_updated = launch_data.last_updated
    launch.mission_name = launch_data.mission_name
    launch.status_name = launch_data.status_name
    launch.status_description = launch_data.status_description
    launch.date = launch_data.date
    launch.description = launch_data.description
    launch.url = launch_data.url
    launch.image_url = launch_data.image_url
    launch.rocket_id = launch_data.rocket_id
    launch.program_id = launch_data.program_id
    launch.site_id = launch_data.site_id

    await db.commit()
    await db.refresh(launch)
    return launch


async def get_current_launches(db: AsyncSession) -> list[tuple[str, datetime]]:
    result = await db.execute(select(Launch.id, Launch.last_updated))
    launches = result.all()
    return launches
