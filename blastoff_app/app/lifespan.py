from contextlib import asynccontextmanager
from datetime import timedelta

from fastapi import FastAPI

from app.database import Base, SessionLocal, engine
from app.emails import LaunchEmailNotifier
from app.redis import redis


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    await redis.init_connection()

    async with SessionLocal() as db:
        email_notifier = LaunchEmailNotifier(app, db, redis)
        await email_notifier.schedule_notifications(
            time_delta=timedelta(hours=1)
        )

    yield

    await engine.dispose()
    await redis.close_connection()
