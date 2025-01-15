from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud import (
    create_program,
    delete_program,
    get_all_programs,
    get_program_by_id,
)
from app.dependencies import get_db
from app.schemas import ProgramCreate, ProgramResponse

router = APIRouter()


@router.post("/", response_model=ProgramResponse, status_code=201)
async def create_program_route(
    program: ProgramCreate, db: AsyncSession = Depends(get_db)
):
    """
    Endpoint to create a new program.

    - **program**: The data of the new program to be created.

    Returns the created program.
    """
    return await create_program(db=db, program_data=program)


@router.get("/{program_id}", response_model=ProgramResponse)
async def get_program(program_id: int, db: AsyncSession = Depends(get_db)):
    """
    Endpoint to get a specific program by ID.

    - **program_id**: The ID of the program to retrieve.

    Returns the program if found, else raises a 404 error.
    """
    program = await get_program_by_id(db=db, program_id=program_id)
    if not program:
        raise HTTPException(status_code=404, detail="Program not found")
    return program


@router.get("/", response_model=List[ProgramResponse])
async def get_programs(db: AsyncSession = Depends(get_db)):
    """
    Endpoint to get all programs.

    Returns a list of all programs in the system.
    """
    return await get_all_programs(db=db)


@router.delete("/{program_id}", response_model=ProgramResponse)
async def delete_program_route(
    program_id: int, db: AsyncSession = Depends(get_db)
):
    """
    Endpoint to delete a program by its ID.

    - **program_id**: The ID of the program to be deleted.

    Returns the deleted program if found.
    """
    deleted_program = await delete_program(db=db, program_id=program_id)
    if not deleted_program:
        raise HTTPException(status_code=404, detail="Program not found")
    return deleted_program
