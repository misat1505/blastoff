from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.models import Program
from app.schemas import ProgramCreate, ProgramResponse


async def create_program(
    db: AsyncSession, program_data: ProgramCreate
) -> ProgramResponse:
    db_program = Program(**program_data.model_dump())
    db.add(db_program)
    await db.commit()
    await db.refresh(db_program)
    return db_program


async def get_program_by_id(
    db: AsyncSession, program_id: int
) -> ProgramResponse:
    result = await db.execute(select(Program).filter(Program.id == program_id))
    program = result.scalar_one_or_none()
    if program is None:
        raise HTTPException(status_code=404, detail="Program not found")
    return program


async def get_all_programs(db: AsyncSession) -> list[ProgramResponse]:
    result = await db.execute(select(Program))
    programs = result.scalars().all()
    return programs


async def delete_program(db: AsyncSession, program_id: int):
    program = await get_program_by_id(db, program_id)
    if not program:
        return None
    await db.delete(program)
    await db.commit()
    return program
