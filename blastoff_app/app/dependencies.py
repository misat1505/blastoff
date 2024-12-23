from fastapi import Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.authentication import decode_access_token
from app.database import SessionLocal
from app.models import User
from app.redis import RedisClient, redis


async def get_db():
    async with SessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()


async def get_current_user(
    request: Request, db: AsyncSession = Depends(get_db)
) -> User:
    """Extracts user from JWT token stored in cookies."""
    token = request.cookies.get("token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    try:
        payload = decode_access_token(token)
        user_id = payload.get("id")
    except HTTPException:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    if not user_id:
        raise HTTPException(status_code=401, detail="User not found in token")

    db_user = await db.get(User, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    return db_user


async def get_redis() -> RedisClient:
    if not redis.redis:
        await redis.init_connection()
    return redis
