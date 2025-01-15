from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.models import FavouriteAgency
from app.schemas import FavouriteAgencyCreate, FavouriteAgencyDelete


async def create_favourite_agency(
    db: AsyncSession, favourite_agency: FavouriteAgencyCreate, user_id: int
):
    """
    Create a new favourite agency for a specific user.

    Args:
        db (AsyncSession): Database session object.
        favourite_agency (FavouriteAgencyCreate): Data required to create a favourite agency entry.
        user_id (int): The ID of the user creating the favourite agency.

    Returns:
        FavouriteAgency: The created favourite agency entry.
    """
    db_fav = FavouriteAgency(**favourite_agency.model_dump(), user_id=user_id)
    db.add(db_fav)
    await db.commit()
    await db.refresh(db_fav)
    return db_fav


async def get_favourite_agency_by_id(
    db: AsyncSession, favourite_agency_id: int
):
    """
    Retrieve a favourite agency entry by its ID.

    Args:
        db (AsyncSession): Database session object.
        favourite_agency_id (int): The ID of the favourite agency to retrieve.

    Returns:
        FavouriteAgency: The favourite agency entry if found, otherwise None.
    """
    result = await db.execute(
        select(FavouriteAgency).filter(
            FavouriteAgency.id == favourite_agency_id
        )
    )
    agency = result.scalar_one_or_none()
    return agency


async def get_all_favourite_agencies(
    db: AsyncSession, skip: int = 0, limit: int = 100
):
    """
    Retrieve all favourite agency entries with optional pagination.

    Args:
        db (AsyncSession): Database session object.
        skip (int): Number of entries to skip. Defaults to 0.
        limit (int): Maximum number of entries to retrieve. Defaults to 100.

    Returns:
        list[FavouriteAgency]: A list of favourite agency entries.
    """
    result = await db.execute(
        select(FavouriteAgency).offset(skip).limit(limit)
    )
    result = result.scalars().all()
    return result


async def get_favourite_agencies_by_user_id(
    db: AsyncSession, user_id: int, skip: int = 0, limit: int = 100
):
    """
    Retrieve favourite agency entries for a specific user with optional pagination.

    Args:
        db (AsyncSession): Database session object.
        user_id (int): The ID of the user whose favourite agencies are being retrieved.
        skip (int): Number of entries to skip. Defaults to 0.
        limit (int): Maximum number of entries to retrieve. Defaults to 100.

    Returns:
        list[FavouriteAgency]: A list of favourite agency entries for the specified user.
    """
    result = await db.execute(
        select(FavouriteAgency)
        .filter(FavouriteAgency.user_id == user_id)
        .offset(skip)
        .limit(limit)
    )
    result = result.scalars().all()
    return result


async def delete_favourite_agency_by_id(
    db: AsyncSession, favourite_agency_id: int
):
    """
    Delete a favourite agency entry by its ID.

    Args:
        db (AsyncSession): Database session object.
        favourite_agency_id (int): The ID of the favourite agency to delete.

    Returns:
        bool: True if the entry was deleted, False otherwise.
    """
    result = await db.execute(
        select(FavouriteAgency).filter(
            FavouriteAgency.id == favourite_agency_id
        )
    )
    fav = result.scalar_one_or_none()

    if fav:
        await db.delete(fav)
        await db.commit()
        return True
    return False


async def delete_favourite_agency_by_user_or_agency(
    db: AsyncSession, fav_delete: FavouriteAgencyDelete
):
    """
    Delete a favourite agency entry by user ID and agency ID.

    Args:
        db (AsyncSession): Database session object.
        fav_delete (FavouriteAgencyDelete): Data specifying the user ID and agency ID of the entry to delete.

    Returns:
        bool: True if the entry was deleted, False otherwise.
    """
    result = await db.execute(
        select(FavouriteAgency)
        .filter(FavouriteAgency.user_id == fav_delete.user_id)
        .filter(FavouriteAgency.agency_id == fav_delete.agency_id)
    )
    fav = result.scalar_one_or_none()

    if fav:
        await db.delete(fav)
        await db.commit()
        return True
    return False
