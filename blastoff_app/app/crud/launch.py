from app.models import Launch, Site, Agency, Rocket
from app.schemas import LaunchCreate, LaunchResponse
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload
from sqlalchemy.future import select
from datetime import datetime, timezone


async def create_launch(db: AsyncSession, launch_data: LaunchCreate) -> LaunchResponse:
    db_launch = Launch(
        id=launch_data.id,
        last_updated=launch_data.last_updated,
        mission_name=launch_data.mission_name,
        status_name=launch_data.status_name,
        status_description=launch_data.status_description,
        date=launch_data.date,
        description=launch_data.description,
        url=launch_data.url,
        image_url=launch_data.image_url,
        rocket_id=launch_data.rocket_id,
        program_id=launch_data.program_id,
        site_id=launch_data.site_id,
    )
    db.add(db_launch)
    await db.commit()
    await db.refresh(db_launch)
    return db_launch


async def get_launch_by_id(db: AsyncSession, launch_id: str) -> LaunchResponse:
    result = await db.execute(select(Launch).filter(Launch.id == launch_id))
    launch = result.scalar_one_or_none()
    if launch is None:
        raise HTTPException(status_code=404, detail="Launch not found")
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


async def get_future_launches_sorted(db: AsyncSession):
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
    return result.scalars().all()
