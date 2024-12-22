from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.models import FavouriteAgency
from app.schemas import FavouriteAgencyCreate, FavouriteAgencyDelete


async def create_favourite_agency(
    db: AsyncSession, favourite_agency: FavouriteAgencyCreate
):
    db_fav = FavouriteAgency(
        user_id=favourite_agency.user_id, agency_id=favourite_agency.agency_id
    )
    db.add(db_fav)
    await db.commit()
    await db.refresh(db_fav)
    return db_fav


async def get_favourite_agency_by_id(
    db: AsyncSession, favourite_agency_id: int
):
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
    result = await db.execute(
        select(FavouriteAgency).offset(skip).limit(limit)
    )
    result = result.scalars().all()
    return result


async def get_favourite_agencies_by_user_id(
    db: AsyncSession, user_id: int, skip: int = 0, limit: int = 100
):
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
