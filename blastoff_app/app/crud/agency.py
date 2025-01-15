from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.models import Agency
from app.schemas import AgencyCreate, AgencyResponse


async def create_agency(
    db: AsyncSession, agency_data: AgencyCreate
) -> AgencyResponse:
    """
    Create a new agency.

    Args:
        db (AsyncSession): Database session object.
        agency_data (AgencyCreate): Data required to create an agency.

    Returns:
        AgencyResponse: The created agency object.
    """
    db_agency = Agency(**agency_data.model_dump())
    db.add(db_agency)
    await db.commit()
    await db.refresh(db_agency)
    return db_agency


async def get_all_agencies(db: AsyncSession) -> list[AgencyResponse]:
    """
    Retrieve all agencies from the database.

    Args:
        db (AsyncSession): Database session object.

    Returns:
        list[AgencyResponse]: A list of all agencies.
    """
    result = await db.execute(select(Agency))
    agencies = result.scalars().all()
    return agencies


async def get_agency_by_id(db: AsyncSession, agency_id: int) -> AgencyResponse:
    """
    Retrieve an agency by its ID.

    Args:
        db (AsyncSession): Database session object.
        agency_id (int): The ID of the agency to retrieve.

    Returns:
        AgencyResponse: The agency object if found, otherwise None.
    """
    result = await db.execute(select(Agency).filter(Agency.id == agency_id))
    agency = result.scalar_one_or_none()
    return agency


async def update_agency(
    db: AsyncSession, agency_id: int, agency_data: AgencyCreate
):
    """
    Update an existing agency's information.

    Args:
        db (AsyncSession): Database session object.
        agency_id (int): The ID of the agency to update.
        agency_data (AgencyCreate): Updated data for the agency.

    Returns:
        AgencyResponse: The updated agency object if found, otherwise None.
    """
    agency = await get_agency_by_id(db, agency_id)
    if not agency:
        return None

    agency.name = agency_data.name
    agency.country = agency_data.country
    agency.description = agency_data.description
    agency.website = agency_data.website
    agency.image_url = agency_data.image_url

    await db.commit()
    await db.refresh(agency)
    return agency


async def delete_agency(db: AsyncSession, agency_id: int):
    """
    Delete an agency by its ID.

    Args:
        db (AsyncSession): Database session object.
        agency_id (int): The ID of the agency to delete.

    Returns:
        AgencyResponse: The deleted agency object if found, otherwise None.
    """
    agency = await get_agency_by_id(db, agency_id)
    if not agency:
        return None

    await db.delete(agency)
    await db.commit()
    return agency
