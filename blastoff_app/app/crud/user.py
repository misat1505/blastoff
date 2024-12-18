from app.models import User
from app.schemas import UserCreate
from app.security import get_password_hash
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select


async def create_user(db: AsyncSession, user: UserCreate):
    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=get_password_hash(user.password),
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user


async def get_user_by_id(db: AsyncSession, user_id: int):
    result = await db.execute(select(User).filter(User.id == user_id))
    user = result.scalar_one_or_none()
    return user


async def get_all_users(db: AsyncSession):
    result = await db.execute(select(User))
    return result.scalars().all()


async def delete_user(db: AsyncSession, user_id: int):
    result = await db.execute(select(User).filter(User.id == user_id))
    user = result.scalar_one_or_none()

    if user:
        await db.delete(user)
        await db.commit()
        return True
    return False


async def update_user_email(db: AsyncSession, user_id: int, new_email: str):
    result = await db.execute(select(User).filter(User.id == user_id))
    user = result.scalar_one_or_none()

    if user:
        user.email = new_email
        await db.commit()
        await db.refresh(user)
        return user
    return None
