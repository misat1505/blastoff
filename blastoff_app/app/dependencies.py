from app.database import SessionLocal


async def get_db():
    async with SessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
