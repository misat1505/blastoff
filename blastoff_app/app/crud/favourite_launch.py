from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.models import FavouriteLaunch
from app.schemas import FavouriteLaunchCreate, FavouriteLaunchDelete


async def create_favourite_launch(
    db: AsyncSession, favourite_launch: FavouriteLaunchCreate, user_id: int
):
    """
    Create a new favourite launch for a specific user.

    Args:
        db (AsyncSession): Database session object.
        favourite_launch (FavouriteLaunchCreate): Data required to create a favourite launch entry.
        user_id (int): The ID of the user creating the favourite launch.

    Returns:
        FavouriteLaunch: The created favourite launch entry.
    """
    db_fav = FavouriteLaunch(**favourite_launch.model_dump(), user_id=user_id)
    db.add(db_fav)
    await db.commit()
    await db.refresh(db_fav)
    return db_fav


async def get_favourite_launch_by_id(
    db: AsyncSession, favourite_launch_id: int
):
    """
    Retrieve a favourite launch entry by its ID.

    Args:
        db (AsyncSession): Database session object.
        favourite_launch_id (int): The ID of the favourite launch to retrieve.

    Returns:
        FavouriteLaunch: The favourite launch entry if found, otherwise None.
    """
    result = await db.execute(
        select(FavouriteLaunch).filter(
            FavouriteLaunch.id == favourite_launch_id
        )
    )
    launch = result.scalar_one_or_none()
    return launch


async def get_all_favourite_launches(
    db: AsyncSession, skip: int = 0, limit: int = 100
):
    """
    Retrieve all favourite launch entries with optional pagination.

    Args:
        db (AsyncSession): Database session object.
        skip (int): Number of entries to skip. Defaults to 0.
        limit (int): Maximum number of entries to retrieve. Defaults to 100.

    Returns:
        list[FavouriteLaunch]: A list of favourite launch entries.
    """
    result = await db.execute(
        select(FavouriteLaunch).offset(skip).limit(limit)
    )
    result = result.scalars().all()
    return result


async def get_favourite_launches_by_user_id(
    db: AsyncSession, user_id: int, skip: int = 0, limit: int = 100
):
    """
    Retrieve favourite launch entries for a specific user with optional pagination.

    Args:
        db (AsyncSession): Database session object.
        user_id (int): The ID of the user whose favourite launches are being retrieved.
        skip (int): Number of entries to skip. Defaults to 0.
        limit (int): Maximum number of entries to retrieve. Defaults to 100.

    Returns:
        list[FavouriteLaunch]: A list of favourite launch entries for the specified user.
    """

    result = await db.execute(
        select(FavouriteLaunch)
        .filter(FavouriteLaunch.user_id == user_id)
        .offset(skip)
        .limit(limit)
    )
    result = result.scalars().all()
    return result


async def delete_favourite_launch_by_id(
    db: AsyncSession, favourite_launch_id: int
):
    """
    Delete a favourite launch entry by its ID.

    Args:
        db (AsyncSession): Database session object.
        favourite_launch_id (int): The ID of the favourite launch to delete.

    Returns:
        bool: True if the entry was deleted, False otherwise.
    """
    result = await db.execute(
        select(FavouriteLaunch).filter(
            FavouriteLaunch.id == favourite_launch_id
        )
    )
    fav = result.scalar_one_or_none()

    if fav:
        await db.delete(fav)
        await db.commit()
        return True
    return False


async def delete_favourite_launch_by_user_or_launch(
    db: AsyncSession, fav_delete: FavouriteLaunchDelete
):
    """
    Delete a favourite launch entry by user ID and launch ID.

    Args:
        db (AsyncSession): Database session object.
        fav_delete (FavouriteLaunchDelete): Data specifying the user ID and launch ID of the entry to delete.

    Returns:
        bool: True if the entry was deleted, False otherwise.
    """
    result = await db.execute(
        select(FavouriteLaunch)
        .filter(FavouriteLaunch.user_id == fav_delete.user_id)
        .filter(FavouriteLaunch.launch_id == fav_delete.launch_id)
    )
    fav = result.scalar_one_or_none()

    if fav:
        await db.delete(fav)
        await db.commit()
        return True
    return False
