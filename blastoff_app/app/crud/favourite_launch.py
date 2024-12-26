from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.models import FavouriteLaunch
from app.schemas import FavouriteLaunchCreate, FavouriteLaunchDelete


async def create_favourite_launch(
    db: AsyncSession, favourite_launch: FavouriteLaunchCreate, user_id: int
):
    db_fav = FavouriteLaunch(**favourite_launch.model_dump(), user_id=user_id)
    db.add(db_fav)
    await db.commit()
    await db.refresh(db_fav)
    return db_fav


async def get_favourite_launch_by_id(
    db: AsyncSession, favourite_launch_id: int
):
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
    result = await db.execute(
        select(FavouriteLaunch).offset(skip).limit(limit)
    )
    result = result.scalars().all()
    return result


async def get_favourite_launches_by_user_id(
    db: AsyncSession, user_id: int, skip: int = 0, limit: int = 100
):
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
