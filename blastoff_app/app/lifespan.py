from contextlib import asynccontextmanager
from datetime import timedelta
import asyncio

from fastapi import FastAPI

from app.database import Base, SessionLocal, engine, get_db
from app.emails import EmailNotifier
from app.redis import redis
from app.get_data import get_api_data


async def scheduled_task():
    while True:
        async for db in get_db():
            await get_api_data(db)
        await asyncio.sleep(3600)


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    await redis.init_connection()
    asyncio.create_task(scheduled_task())
    async with SessionLocal() as db:
        email_notifier = EmailNotifier(app, db, redis)
        await email_notifier.schedule_notifications(
            time_delta=timedelta(hours=1)
        )

    yield

    await engine.dispose()
    await redis.close_connection()
