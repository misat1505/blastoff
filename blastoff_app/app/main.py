from fastapi import FastAPI

from app.config import init_sentry, setup_cors
from app.lifespan import lifespan
from app.routers import api_router

init_sentry()

app = FastAPI(lifespan=lifespan)

setup_cors(app)

app.include_router(api_router, prefix="/api/v1")
