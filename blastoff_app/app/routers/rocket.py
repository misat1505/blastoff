from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud import (
    create_rocket,
    delete_rocket,
    get_all_rockets,
    get_detailed_rocket_by_id,
    get_rocket_by_id,
)
from app.dependencies import get_db, get_redis
from app.redis import RedisClient
from app.schemas import DetailedRocketResponse, RocketCreate, RocketResponse

router = APIRouter()


@router.post("/", response_model=RocketResponse)
async def create_rocket_route(
    rocket: RocketCreate, db: AsyncSession = Depends(get_db)
):
    """
    Endpoint to create a new rocket.

    - **rocket**: The data of the new rocket to be created.

    Returns the created rocket.
    """
    db_rocket = await create_rocket(db=db, rocket_data=rocket)
    return db_rocket


@router.get("/", response_model=list[RocketResponse])
async def get_rockets(db: AsyncSession = Depends(get_db)):
    """
    Endpoint to retrieve a list of all rockets.

    Returns a list of rockets available in the system.
    """
    rockets = await get_all_rockets(db=db)
    return rockets


@router.get("/{rocket_id}/details", response_model=DetailedRocketResponse)
async def get_detailed_rocket(
    rocket_id: int,
    db: AsyncSession = Depends(get_db),
    redis: RedisClient = Depends(get_redis),
):
    """
    Endpoint to retrieve detailed information about a rocket by its ID.

    - **rocket_id**: The ID of the rocket for which detailed information is needed.

    Returns detailed information of the rocket if found.
    """
    rocket = await get_detailed_rocket_by_id(
        db=db, redis=redis, rocket_id=rocket_id
    )
    if rocket is None:
        raise HTTPException(status_code=404, detail="Rocket not found")
    return rocket


@router.get("/{rocket_id}", response_model=RocketResponse)
async def get_rocket(rocket_id: int, db: AsyncSession = Depends(get_db)):
    """
    Endpoint to retrieve basic information about a rocket by its ID.

    - **rocket_id**: The ID of the rocket to retrieve.

    Returns the basic details of the rocket if found.
    """
    rocket = await get_rocket_by_id(db=db, rocket_id=rocket_id)
    if not rocket:
        raise HTTPException(status_code=404, detail="Rocket not found")
    return rocket


@router.delete("/{rocket_id}", response_model=RocketResponse)
async def delete_rocket_route(
    rocket_id: int, db: AsyncSession = Depends(get_db)
):
    """
    Endpoint to delete a rocket by its ID.

    - **rocket_id**: The ID of the rocket to be deleted.

    Returns the deleted rocket if successfully deleted.
    """
    deleted_rocket = await delete_rocket(db=db, rocket_id=rocket_id)
    if not deleted_rocket:
        raise HTTPException(status_code=404, detail="Rocket not found")
    return deleted_rocket
