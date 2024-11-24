from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas import AgencyCreate, AgencyResponse
from app.crud import (
    create_agency,
    get_all_agencies,
    get_agency_by_id,
    update_agency,
    delete_agency,
)
from app.dependencies import get_db

router = APIRouter()


@router.post("/", response_model=AgencyResponse)
async def create_agency_route(agency: AgencyCreate, db: AsyncSession = Depends(get_db)):
    db_agency = await create_agency(db=db, agency_data=agency)
    return db_agency


@router.get("/", response_model=list[AgencyResponse])
async def get_agencies(db: AsyncSession = Depends(get_db)):
    agencies = await get_all_agencies(db=db)
    return agencies


@router.get("/{agency_id}", response_model=AgencyResponse)
async def get_agency(agency_id: int, db: AsyncSession = Depends(get_db)):
    agency = await get_agency_by_id(db=db, agency_id=agency_id)
    if not agency:
        raise HTTPException(status_code=404, detail="Agency not found")
    return agency


@router.put("/{agency_id}", response_model=AgencyResponse)
async def update_agency_route(
    agency_id: int, agency: AgencyCreate, db: AsyncSession = Depends(get_db)
):
    updated_agency = await update_agency(db=db, agency_id=agency_id, agency_data=agency)
    if not updated_agency:
        raise HTTPException(status_code=404, detail="Agency not found")
    return updated_agency


@router.delete("/{agency_id}", response_model=AgencyResponse)
async def delete_agency_route(agency_id: int, db: AsyncSession = Depends(get_db)):
    deleted_agency = await delete_agency(db=db, agency_id=agency_id)
    if not deleted_agency:
        raise HTTPException(status_code=404, detail="Agency not found")
    return deleted_agency
