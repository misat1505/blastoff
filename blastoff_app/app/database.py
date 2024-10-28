# app/database.py

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

DATABASE_URL = "mysql+aiomysql://root:root@localhost:3306/blastoff_db"

# Use create_async_engine for async support
engine = create_async_engine(DATABASE_URL, echo=True)

# Use sessionmaker to define async sessions
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    class_=AsyncSession  # Specify the session class for async use
)

Base = declarative_base()
