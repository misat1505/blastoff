import asyncio
from contextlib import asynccontextmanager
from datetime import timedelta

from fastapi import FastAPI

from app.database import Base, SessionLocal, engine, get_db
from app.emails import EmailNotifier
from app.get_data import get_api_data
from app.redis import redis


async def refresh_data(app: FastAPI):
    while True:
        async for db in get_db():
            await get_api_data(db)
        async with SessionLocal() as db:
            email_notifier = EmailNotifier(app, db, redis)
            await email_notifier.schedule_notifications(
                time_delta=timedelta(hours=1)
            )
        await asyncio.sleep(3600)


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    await redis.init_connection()
    asyncio.create_task(refresh_data(app))

    yield

    await engine.dispose()
    await redis.close_connection()
