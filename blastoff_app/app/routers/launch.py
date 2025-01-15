from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud import (
    create_launch,
    delete_launch,
    get_all_launches,
    get_detailed_launch,
    get_future_launches_sorted,
    get_launch_by_id,
)
from app.dependencies import get_db, get_redis
from app.redis import RedisClient
from app.schemas import DetailedLaunchResponse, LaunchCreate, LaunchResponse

router = APIRouter()


@router.post("/", response_model=LaunchResponse, status_code=201)
async def create_launch_route(
    launch: LaunchCreate, db: AsyncSession = Depends(get_db)
):
    """
    Endpoint to create a new launch.

    - **launch**: The data of the new launch to be created.

    Returns the created launch.
    """
    return await create_launch(db=db, launch_data=launch)


@router.get("/future", response_model=list[DetailedLaunchResponse])
async def get_future_launches(
    db: AsyncSession = Depends(get_db), redis: RedisClient = Depends(get_redis)
):
    """
    Endpoint to get all future launches sorted.

    This endpoint fetches all launches that are scheduled to happen in the future.
    It uses Redis for caching to improve performance.

    Returns a list of detailed future launches.
    """
    launches = await get_future_launches_sorted(db=db, redis=redis)
    return launches


@router.get("/{launch_id}/details", response_model=DetailedLaunchResponse)
async def get_detailed_launch_by_id(
    launch_id: str,
    db: AsyncSession = Depends(get_db),
    redis: RedisClient = Depends(get_redis),
):
    """
    Endpoint to get detailed information about a specific launch by ID.

    - **launch_id**: The ID of the launch for which detailed information is being requested.

    Returns detailed information about the launch if found.
    """
    launch = await get_detailed_launch(db=db, redis=redis, launch_id=launch_id)
    if not launch:
        raise HTTPException(status_code=404, detail="Launch not found")
    return launch


@router.get("/{launch_id}", response_model=LaunchResponse)
async def get_launch(launch_id: str, db: AsyncSession = Depends(get_db)):
    """
    Endpoint to get basic information about a specific launch by ID.

    - **launch_id**: The ID of the launch to retrieve.

    Returns the basic information of the launch if found.
    """
    launch = await get_launch_by_id(db=db, launch_id=launch_id)
    if not launch:
        raise HTTPException(status_code=404, detail="Launch not found")
    return launch


@router.get("/", response_model=List[LaunchResponse])
async def get_launches(db: AsyncSession = Depends(get_db)):
    """
    Endpoint to get a list of all launches.

    Returns a list of all launches in the system.
    """
    return await get_all_launches(db=db)


@router.delete("/{launch_id}", response_model=LaunchResponse)
async def delete_launch_route(
    launch_id: str, db: AsyncSession = Depends(get_db)
):
    """
    Endpoint to delete a launch by its ID.

    - **launch_id**: The ID of the launch to be deleted.

    Returns the deleted launch if found.
    """
    deleted_launch = await delete_launch(db=db, launch_id=launch_id)
    if not deleted_launch:
        raise HTTPException(status_code=404, detail="Launch not found")
    return deleted_launch
