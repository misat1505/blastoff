from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.exc import NoResultFound
from app.models import Agency
from app.schemas import AgencyCreate


async def create_agency(db: AsyncSession, agency_data: AgencyCreate):
    db_agency = Agency(
        name=agency_data.name,
        country=agency_data.country,
        description=agency_data.description,
        website=agency_data.website,
    )
    db.add(db_agency)
    await db.commit()
    await db.refresh(db_agency)
    return db_agency


async def get_all_agencies(db: AsyncSession):
    result = await db.execute(select(Agency))
    agencies = result.scalars().all()
    return agencies


async def get_agency_by_id(db: AsyncSession, agency_id: int):
    result = await db.execute(select(Agency).filter(Agency.id == agency_id))
    agency = result.scalar_one_or_none()
    return agency


async def update_agency(db: AsyncSession, agency_id: int, agency_data: AgencyCreate):
    agency = await get_agency_by_id(db, agency_id)
    if not agency:
        return None

    agency.name = agency_data.name
    agency.country = agency_data.country
    agency.description = agency_data.description
    agency.website = agency_data.website

    await db.commit()
    await db.refresh(agency)
    return agency


async def delete_agency(db: AsyncSession, agency_id: int):
    agency = await get_agency_by_id(db, agency_id)
    if not agency:
        return None

    await db.delete(agency)
    await db.commit()
    return agency
