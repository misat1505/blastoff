from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.database import Base, engine
from app.redis import redis


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    await redis.init_connection()

    yield

    await engine.dispose()
    await redis.close_connection()
