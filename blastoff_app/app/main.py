from fastapi import FastAPI
from app.routers import user, agency, favourite_agency
from app.database import engine
from app.database import Base

app = FastAPI()

app.include_router(user.router, prefix="/users", tags=["Users"])
app.include_router(agency.router, prefix="/agencies", tags=["agencies"])
app.include_router(
    favourite_agency.router, prefix="/favourite-agencies", tags=["favourite_agencies"]
)


@app.on_event("startup")
async def startup():
    # Use SQLAlchemy's create_all to create tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
