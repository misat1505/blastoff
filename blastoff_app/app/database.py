from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from app.settings import settings

engine = create_async_engine(settings.database_url, echo=True)

SessionLocal = sessionmaker(
    bind=engine, class_=AsyncSession, expire_on_commit=False
)


async def get_db():
    """
    Dependency that provides an asynchronous database session.

    This function is used in FastAPI route handlers to provide an active
    database session to interact with the database. It ensures that the session
    is properly closed after use.

    Yields:
        AsyncSession: An active database session.
    """
    async with SessionLocal() as session:
        yield session


Base = declarative_base()
