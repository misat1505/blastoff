from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import get_db


router = APIRouter()


@router.post("/", response_model=schemas.FavouriteLaunch)
async def create_favourite_launch(
    favourite_launch: schemas.FavouriteLaunchCreate, db: Session = Depends(get_db)
):
    return await crud.create_favourite_launch(db=db, favourite_launch=favourite_launch)


@router.get("/{favourite_launch_id}", response_model=schemas.FavouriteLaunch)
def get_favourite_launch(favourite_launch_id: int, db: Session = Depends(get_db)):
    db_fav_launch = crud.get_favourite_launch_by_id(db, favourite_launch_id)
    if db_fav_launch is None:
        raise HTTPException(status_code=404, detail="Favourite launch not found")
    return db_fav_launch


@router.get("/", response_model=list[schemas.FavouriteLaunch])
async def get_all_favourite_launches_route(
    skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
):
    return await crud.get_all_favourite_launches(db=db, skip=skip, limit=limit)


@router.delete("/{favourite_launch_id}", response_model=schemas.FavouriteLaunch)
def delete_favourite_launch_by_id_route(
    favourite_launch_id: int, db: Session = Depends(get_db)
):
    db_fav_launch = crud.delete_favourite_launch_by_id(
        db=db, favourite_launch_id=favourite_launch_id
    )
    if db_fav_launch is None:
        raise HTTPException(status_code=404, detail="Favourite launch not found")
    return db_fav_launch


@router.delete("/", response_model=list[schemas.FavouriteLaunch])
def delete_favourite_launch_by_user_or_launch_route(
    fav_delete: schemas.FavouriteLaunchDelete, db: Session = Depends(get_db)
):
    fav_to_delete = crud.delete_favourite_launch_by_user_or_launch(
        db=db, fav_delete=fav_delete
    )
    if not fav_to_delete:
        raise HTTPException(
            status_code=404, detail="No matching Favourite launches found"
        )
    return fav_to_delete
