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
    """
    Endpoint to create a new favourite launch for the authenticated user.

    - **favourite_launch**: The data for the new favourite launch.
    - **user**: The authenticated user who is adding the favourite launch.

    Returns the created favourite launch in the response.
    """
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
    """
    Endpoint to get all favourite launches for the authenticated user.

    - **skip**: The number of items to skip for pagination.
    - **limit**: The maximum number of items to return.
    - **user**: The authenticated user whose favourite launches are being retrieved.

    Returns a list of favourite launches for the user.
    """
    return await crud.get_favourite_launches_by_user_id(
        db=db, user_id=user.id, skip=skip, limit=limit
    )


@router.get("/{favourite_launch_id}", response_model=schemas.FavouriteLaunch)
async def get_favourite_launch(
    favourite_launch_id: int, db: AsyncSession = Depends(get_db)
):
    """
    Endpoint to get a specific favourite launch by its ID.

    - **favourite_launch_id**: The ID of the favourite launch to retrieve.

    Returns the requested favourite launch if found.
    """
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
    """
    Endpoint to get all favourite launches in the system.

    - **skip**: The number of items to skip for pagination.
    - **limit**: The maximum number of items to return.

    Returns a list of all favourite launches.
    """
    return await crud.get_all_favourite_launches(db=db, skip=skip, limit=limit)


@router.delete("/{favourite_launch_id}")
async def delete_favourite_launch_by_id_route(
    favourite_launch_id: int, db: AsyncSession = Depends(get_db)
):
    """
    Endpoint to delete a favourite launch by its ID.

    - **favourite_launch_id**: The ID of the favourite launch to delete.

    Returns the deleted favourite launch if found.
    """
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
    """
    Endpoint to delete a favourite launch based on user or launch criteria.

    - **fav_delete**: The data specifying which favourite launch to delete (either by user or launch).

    Returns the deleted favourite launch if found.
    """
    fav_to_delete = await crud.delete_favourite_launch_by_user_or_launch(
        db=db, fav_delete=fav_delete
    )
    if not fav_to_delete:
        raise HTTPException(
            status_code=404, detail="No matching Favourite launches found"
        )
    return fav_to_delete
