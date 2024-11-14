from fastapi import FastAPI
from app.routers import user, agency, favourite_agency, rocket, launch, program
from app.database import engine
from app.database import Base

app = FastAPI()

app.include_router(user.router, prefix="/users", tags=["Users"])
app.include_router(agency.router, prefix="/agencies", tags=["Agencies"])
app.include_router(
    favourite_agency.router, prefix="/favourite-agencies", tags=["FavouriteAgencies"]
)
app.include_router(rocket.router, prefix="/rockets", tags=["Rockets"])
app.include_router(launch.router, prefix="/launches", tags=["Launches"])
app.include_router(program.router, prefix="/programs", tags=["Programs"])


@app.on_event("startup")
async def startup():
    # Use SQLAlchemy's create_all to create tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


@app.on_event("shutdown")
async def shutdown_event():
    await engine.dispose()
