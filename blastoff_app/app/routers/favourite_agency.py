from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app import crud, schemas
from app.dependencies import get_current_user, get_db
from app.models import User

router = APIRouter()


@router.post("/", response_model=schemas.FavouriteAgency)
async def create_favourite_agency(
    favourite_agency: schemas.FavouriteAgencyCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    return await crud.create_favourite_agency(
        db=db, favourite_agency=favourite_agency, user_id=user.id
    )


@router.get("/mine", response_model=list[schemas.FavouriteAgency])
async def get_mine_favourite_agencies(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    user: User = Depends(get_current_user),
):
    return await crud.get_favourite_agencies_by_user_id(
        db=db, user_id=user.id, skip=skip, limit=limit
    )


@router.get("/{favourite_agency_id}", response_model=schemas.FavouriteAgency)
async def get_favourite_agency(
    favourite_agency_id: int, db: AsyncSession = Depends(get_db)
):
    db_fav_agency = await crud.get_favourite_agency_by_id(
        db, favourite_agency_id
    )
    if db_fav_agency is None:
        raise HTTPException(
            status_code=404, detail="Favourite Agency not found"
        )
    return db_fav_agency


@router.get("/", response_model=list[schemas.FavouriteAgency])
async def get_all_favourite_agencies(
    skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)
):
    return await crud.get_all_favourite_agencies(db=db, skip=skip, limit=limit)


@router.get("/user/{user_id}", response_model=list[schemas.FavouriteAgency])
async def get_favourite_agencies_by_user_id(
    user_id: int,
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db),
):
    return await crud.get_favourite_agencies_by_user_id(
        db=db, user_id=user_id, skip=skip, limit=limit
    )


@router.delete("/{favourite_agency_id}")
async def delete_favourite_agency_by_id(
    favourite_agency_id: int, db: AsyncSession = Depends(get_db)
):
    db_fav_agency = await crud.delete_favourite_agency_by_id(
        db=db, favourite_agency_id=favourite_agency_id
    )
    if db_fav_agency is None:
        raise HTTPException(
            status_code=404, detail="Favourite Agency not found"
        )
    return db_fav_agency


@router.delete("/")
async def delete_favourite_agency_by_user_or_agency(
    fav_delete: schemas.FavouriteAgencyDelete,
    db: AsyncSession = Depends(get_db),
):
    fav_to_delete = await crud.delete_favourite_agency_by_user_or_agency(
        db=db, fav_delete=fav_delete
    )
    if not fav_to_delete:
        raise HTTPException(
            status_code=404, detail="No matching Favourite Agencies found"
        )
    return fav_to_delete
