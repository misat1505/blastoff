from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud import create_program, delete_program, get_all_programs, get_program_by_id
from app.dependencies import get_db
from app.schemas import ProgramCreate, ProgramResponse

router = APIRouter()


@router.post("/", response_model=ProgramResponse, status_code=201)
async def create_program_route(
    program: ProgramCreate, db: AsyncSession = Depends(get_db)
):
    return await create_program(db=db, program_data=program)


@router.get("/{program_id}", response_model=ProgramResponse)
async def get_program(program_id: int, db: AsyncSession = Depends(get_db)):
    program = await get_program_by_id(db=db, program_id=program_id)
    if not program:
        raise HTTPException(status_code=404, detail="Program not found")
    return program


@router.get("/", response_model=List[ProgramResponse])
async def get_programs(db: AsyncSession = Depends(get_db)):
    return await get_all_programs(db=db)


@router.delete("/{program_id}", response_model=ProgramResponse)
async def delete_program_route(
    program_id: int, db: AsyncSession = Depends(get_db)
):
    deleted_program = await delete_program(db=db, program_id=program_id)
    if not deleted_program:
        raise HTTPException(status_code=404, detail="Program not found")
    return deleted_program
