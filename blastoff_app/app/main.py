from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.env import FRONTEND_URL
from app.routers import (
    agency,
    comment,
    favourite_agency,
    favourite_launch,
    launch,
    program,
    rocket,
    site,
    user,
)

app = FastAPI()

origins = [
    FRONTEND_URL,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router, prefix="/users", tags=["Users"])
app.include_router(comment.router, prefix="/comments", tags=["Comments"])
app.include_router(agency.router, prefix="/agencies", tags=["Agencies"])
app.include_router(
    favourite_agency.router,
    prefix="/favourite-agencies",
    tags=["FavouriteAgencies"],
)
app.include_router(rocket.router, prefix="/rockets", tags=["Rockets"])
app.include_router(launch.router, prefix="/launches", tags=["Launches"])
app.include_router(program.router, prefix="/programs", tags=["Programs"])
app.include_router(site.router, prefix="/sites", tags=["Sites"])
app.include_router(
    favourite_launch.router,
    prefix="/favourite-launches",
    tags=["FavouriteLaunches"],
)


@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


@app.on_event("shutdown")
async def shutdown_event():
    await engine.dispose()
