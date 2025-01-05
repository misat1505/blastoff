from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app import crud, schemas
from app.dependencies import get_current_user, get_db
from app.models import User

router = APIRouter()


@router.post("/", response_model=schemas.FavouriteLaunch)
async def create_favourite_launch(
    favourite_launch: schemas.FavouriteLaunchCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    return await crud.create_favourite_launch(
        db=db, favourite_launch=favourite_launch, user_id=user.id
    )


@router.get("/mine", response_model=list[schemas.FavouriteLaunch])
async def get_mine_favourite_launches(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    user: User = Depends(get_current_user),
):
    return await crud.get_favourite_launches_by_user_id(
        db=db, user_id=user.id, skip=skip, limit=limit
    )


@router.get("/{favourite_launch_id}", response_model=schemas.FavouriteLaunch)
async def get_favourite_launch(
    favourite_launch_id: int, db: AsyncSession = Depends(get_db)
):
    db_fav_launch = await crud.get_favourite_launch_by_id(
        db, favourite_launch_id
    )
    if db_fav_launch is None:
        raise HTTPException(
            status_code=404, detail="Favourite launch not found"
        )
    return db_fav_launch


@router.get("/", response_model=list[schemas.FavouriteLaunch])
async def get_all_favourite_launches_route(
    skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)
):
    return await crud.get_all_favourite_launches(db=db, skip=skip, limit=limit)


@router.delete("/{favourite_launch_id}")
async def delete_favourite_launch_by_id_route(
    favourite_launch_id: int, db: AsyncSession = Depends(get_db)
):
    db_fav_launch = await crud.delete_favourite_launch_by_id(
        db=db, favourite_launch_id=favourite_launch_id
    )
    if db_fav_launch is None:
        raise HTTPException(
            status_code=404, detail="Favourite launch not found"
        )
    return db_fav_launch


@router.delete("/")
async def delete_favourite_launch_by_user_or_launch_route(
    fav_delete: schemas.FavouriteLaunchDelete,
    db: AsyncSession = Depends(get_db),
):
    fav_to_delete = await crud.delete_favourite_launch_by_user_or_launch(
        db=db, fav_delete=fav_delete
    )
    if not fav_to_delete:
        raise HTTPException(
            status_code=404, detail="No matching Favourite launches found"
        )
    return fav_to_delete
