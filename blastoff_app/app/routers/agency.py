"""
This module contains the API routes for managing agencies.

Available endpoints:
- **POST /agencies/**: Create a new agency.
- **GET /agencies/**: Retrieve all agencies.
- **GET /agencies/{agency_id}**: Retrieve a specific agency by ID.
- **PUT /agencies/{agency_id}**: Update an existing agency by ID.
- **DELETE /agencies/{agency_id}**: Delete an agency by ID.

Each endpoint corresponds to a specific CRUD operation for managing agency data in the database.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud import (
    create_agency,
    delete_agency,
    get_agency_by_id,
    get_all_agencies,
    update_agency,
)
from app.dependencies import get_db
from app.schemas import AgencyCreate, AgencyResponse

router = APIRouter()


@router.post("/", response_model=AgencyResponse)
async def create_agency_route(
    agency: AgencyCreate, db: AsyncSession = Depends(get_db)
):
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
    updated_agency = await update_agency(
        db=db, agency_id=agency_id, agency_data=agency
    )
    if not updated_agency:
        raise HTTPException(status_code=404, detail="Agency not found")
    return updated_agency


@router.delete("/{agency_id}", response_model=AgencyResponse)
async def delete_agency_route(
    agency_id: int, db: AsyncSession = Depends(get_db)
):
    deleted_agency = await delete_agency(db=db, agency_id=agency_id)
    if not deleted_agency:
        raise HTTPException(status_code=404, detail="Agency not found")
    return deleted_agency
