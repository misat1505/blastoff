from app.crud import create_rocket, get_all_rockets, get_rocket_by_id, delete_rocket
from app.dependencies import get_db
from app.schemas import RocketCreate, RocketResponse
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()


@router.post("/", response_model=RocketResponse)
async def create_rocket_route(rocket: RocketCreate, db: AsyncSession = Depends(get_db)):
    db_rocket = await create_rocket(db=db, rocket_data=rocket)
    return db_rocket


@router.get("/", response_model=list[RocketResponse])
async def get_rockets(db: AsyncSession = Depends(get_db)):
    rockets = await get_all_rockets(db=db)
    return rockets


@router.get("/{rocket_id}", response_model=RocketResponse)
async def get_rocket(rocket_id: int, db: AsyncSession = Depends(get_db)):
    rocket = await get_rocket_by_id(db=db, rocket_id=rocket_id)
    if not rocket:
        raise HTTPException(status_code=404, detail="Rocket not found")
    return rocket


@router.delete("/{rocket_id}", response_model=RocketResponse)
async def delete_rocket_route(rocket_id: int, db: AsyncSession = Depends(get_db)):
    deleted_rocket = await delete_rocket(db=db, rocket_id=rocket_id)
    if not deleted_rocket:
        raise HTTPException(status_code=404, detail="Rocket not found")
    return deleted_rocket
