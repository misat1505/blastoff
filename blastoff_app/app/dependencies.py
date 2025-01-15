from fastapi import Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.authentication import decode_access_token
from app.database import SessionLocal
from app.models import User
from app.redis import RedisClient, redis


async def get_db():
    """
    Dependency that provides an asynchronous database session.

    This function is used as a dependency in FastAPI route handlers to provide
    an active database session that is closed after use.

    Yields:
        AsyncSession: An active database session.
    """
    async with SessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()


async def get_current_user(
    request: Request, db: AsyncSession = Depends(get_db)
) -> User:
    """
    Extracts user from the JWT token stored in cookies.

    This function checks if a JWT token is present in the request cookies,
    decodes it to extract the user ID, and fetches the corresponding user from
    the database. If any issues are found (missing token, invalid token, etc.),
    an HTTPException is raised.

    Args:
        request (Request): The incoming request to extract the token.
        db (AsyncSession): The database session for querying the User model.

    Raises:
        HTTPException: If no token is found, the token is invalid, or the user
                        is not found in the database.

    Returns:
        User: The user extracted from the token.
    """
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
    """
    Initializes and retrieves a Redis client connection.

    This function ensures the Redis client is initialized before use. It checks
    if the Redis client is already connected, and if not, it initializes the
    connection.

    Returns:
        RedisClient: The initialized Redis client.
    """
    if not redis.redis:
        await redis.init_connection()
    return redis
