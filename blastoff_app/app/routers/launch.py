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
from app.dependencies import get_db
from app.schemas import DetailedLaunchResponse, LaunchCreate, LaunchResponse

router = APIRouter()


@router.post("/", response_model=LaunchResponse, status_code=201)
async def create_launch_route(
    launch: LaunchCreate, db: AsyncSession = Depends(get_db)
):
    return await create_launch(db=db, launch_data=launch)


@router.get("/future", response_model=list[DetailedLaunchResponse])
async def get_future_launches(db: AsyncSession = Depends(get_db)):
    launches = await get_future_launches_sorted(db=db)
    if not launches:
        raise HTTPException(status_code=404, detail="No future launches found")
    return launches


@router.get("/{launch_id}/details", response_model=DetailedLaunchResponse)
async def get_detailed_launch_by_id(
    launch_id: str, db: AsyncSession = Depends(get_db)
):
    launch = await get_detailed_launch(db=db, launch_id=launch_id)
    if not launch:
        raise HTTPException(status_code=404, detail="Launch not found")
    return launch


@router.get("/{launch_id}", response_model=LaunchResponse)
async def get_launch(launch_id: str, db: AsyncSession = Depends(get_db)):
    launch = await get_launch_by_id(db=db, launch_id=launch_id)
    if not launch:
        raise HTTPException(status_code=404, detail="Launch not found")
    return launch


@router.get("/", response_model=List[LaunchResponse])
async def get_launches(db: AsyncSession = Depends(get_db)):
    return await get_all_launches(db=db)


@router.delete("/{launch_id}", response_model=LaunchResponse)
async def delete_launch_route(
    launch_id: str, db: AsyncSession = Depends(get_db)
):
    deleted_launch = await delete_launch(db=db, launch_id=launch_id)
    if not deleted_launch:
        raise HTTPException(status_code=404, detail="Launch not found")
    return deleted_launch
