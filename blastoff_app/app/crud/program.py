from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.models import Program
from app.schemas import ProgramCreate, ProgramResponse


async def create_program(
    db: AsyncSession, program_data: ProgramCreate
) -> ProgramResponse:
    """
    Create a new program entry in the database.

    Args:
        db (AsyncSession): The SQLAlchemy asynchronous database session.
        program_data (ProgramCreate): Data required to create a new program.

    Returns:
        ProgramResponse: The newly created program entry.
    """
    db_program = Program(**program_data.model_dump())
    db.add(db_program)
    await db.commit()
    await db.refresh(db_program)
    return db_program


async def get_program_by_id(
    db: AsyncSession, program_id: int
) -> ProgramResponse:
    """
    Retrieve a program entry by its ID.

    Args:
        db (AsyncSession): The SQLAlchemy asynchronous database session.
        program_id (int): The unique identifier of the program.

    Returns:
        ProgramResponse: The program entry if found, or None if not found.
    """
    result = await db.execute(select(Program).filter(Program.id == program_id))
    program = result.scalar_one_or_none()
    return program


async def get_all_programs(db: AsyncSession) -> list[ProgramResponse]:
    """
    Retrieve all program entries from the database.

    Args:
        db (AsyncSession): The SQLAlchemy asynchronous database session.

    Returns:
        list[ProgramResponse]: A list of all program entries.
    """
    result = await db.execute(select(Program))
    programs = result.scalars().all()
    return programs


async def delete_program(db: AsyncSession, program_id: int):
    """
    Delete a program entry by its ID.

    Args:
        db (AsyncSession): The SQLAlchemy asynchronous database session.
        program_id (int): The unique identifier of the program to delete.

    Returns:
        ProgramResponse or None: The deleted program entry if found and deleted, or None if not found.
    """
    program = await get_program_by_id(db, program_id)
    if not program:
        return None
    await db.delete(program)
    await db.commit()
    return program


async def update_program(
    db: AsyncSession, program_id: int, program_data: ProgramCreate
):
    """
    Update an existing program entry with new data.

    Args:
        db (AsyncSession): The SQLAlchemy asynchronous database session.
        program_id (int): The unique identifier of the program to update.
        program_data (ProgramCreate): The updated data for the program.

    Returns:
        ProgramResponse or None: The updated program entry if found and updated, or None if not found.
    """
    program = await get_program_by_id(db, program_id)
    if not program:
        return None

    program.name = program_data.name
    program.website = program_data.website
    program.description = program_data.description
    program.image_url = program_data.image_url

    await db.commit()
    await db.refresh(program)
    return program
