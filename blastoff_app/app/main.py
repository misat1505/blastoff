from fastapi import FastAPI, Depends
from app.database import engine
from app import models
from app.dependencies import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

app = FastAPI()

@app.on_event("startup")
async def on_startup():
    async with engine.begin() as conn:
        await conn.run_sync(models.Base.metadata.create_all)

    async with AsyncSession(engine) as session:
        async with session.begin():
            # Check if any users exist to avoid duplication
            user_exists = await session.execute(
                models.User.__table__.select().limit(1)
            )
            if not user_exists.scalars().first():
                # Insert a new user if none exist
                default_user = models.User(name="Default User")
                session.add(default_user)
        await session.commit()  # Commit the transaction

@app.get("/")
async def read_root(db: AsyncSession = Depends(get_db)):
    # Query all users
    result = await db.execute(select(models.User))
    users = result.scalars().all()

    # Format user data
    user_list = [{"id": user.id, "name": user.name} for user in users]
    
    # Return message and users
    return {
        "message": "Boom, BLASTOFF",
        "users": user_list
    }
