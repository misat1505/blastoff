from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.exc import NoResultFound
from app.models import Rocket
from app.schemas import RocketCreate, RocketResponse
from fastapi import HTTPException


async def create_rocket(db: AsyncSession, rocket_data: RocketCreate) -> RocketResponse:
    db_rocket = Rocket(
        name=rocket_data.name,
        no_stages=rocket_data.no_stages,
        height=rocket_data.height,
        mass=rocket_data.mass,
        diameter=rocket_data.diameter,
        description=rocket_data.description,
        launches_count=rocket_data.launches_count,
        successful_launches_count=rocket_data.successful_launches_count,
        failed_launches_count=rocket_data.failed_launches_count,
        landings_count=rocket_data.landings_count,
        successful_landings_count=rocket_data.successful_landings_count,
        failed_landings_count=rocket_data.failed_landings_count,
        leo_capacity=rocket_data.leo_capacity,
        gto_capacity=rocket_data.gto_capacity,
        geo_capacity=rocket_data.geo_capacity,
        sso_capacity=rocket_data.sso_capacity,
        image_url=rocket_data.image_url,
        agency_id=rocket_data.agency_id,
    )
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
