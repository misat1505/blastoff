from fastapi import FastAPI

from app.config import init_sentry, setup_cors
from app.database import Base, engine
from app.routers import api_router

init_sentry()

app = FastAPI()

setup_cors(app)

app.include_router(api_router, prefix="/api/v1")


@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


@app.on_event("shutdown")
async def shutdown_event():
    await engine.dispose()
