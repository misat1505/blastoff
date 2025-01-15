import asyncio
from contextlib import asynccontextmanager
from datetime import timedelta

from fastapi import FastAPI

from app.database import Base, SessionLocal, engine, get_db
from app.emails import EmailNotifier
from app.get_data import get_api_data
from app.redis import redis


async def refresh_data(app: FastAPI):
    """
    Periodically refreshes data from the API and sends scheduled email notifications.

    This function runs in an infinite loop where:
    - Data is fetched from the API and the database is updated.
    - After refreshing the data, scheduled email notifications are sent every hour.

    Args:
        app (FastAPI): The FastAPI app instance used for passing to EmailNotifier.

    This function runs indefinitely and doesn't return a value.
    It sleeps for one hour between iterations to prevent excessive load.
    """
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
    """
    Manages the lifecycle of the FastAPI app, including database and Redis connections.

    This context manager:
    - Creates database tables if they don't exist.
    - Initializes the Redis connection.
    - Starts the `refresh_data` task to periodically update data and send notifications.

    It also ensures that:
    - The database connection is disposed of properly when the app shuts down.
    - The Redis connection is closed when the app shuts down.

    Args:
        app (FastAPI): The FastAPI app instance used for initialization.

    Yields:
        None: This is a context manager, so the app runs during the lifecycle.
    """
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    await redis.init_connection()
    asyncio.create_task(refresh_data(app))

    yield

    await engine.dispose()
    await redis.close_connection()
