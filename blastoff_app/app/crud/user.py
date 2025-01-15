from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.models import User
from app.schemas import UserCreate
from app.security import get_password_hash


async def create_user(db: AsyncSession, user: UserCreate):
    """
    Create a new user in the database.

    Args:
        db (AsyncSession): The SQLAlchemy asynchronous database session.
        user (UserCreate): The user data for creating a new user.

    Returns:
        User: The newly created user entry.
    """
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
    """
    Retrieve a user by their ID.

    Args:
        db (AsyncSession): The SQLAlchemy asynchronous database session.
        user_id (int): The unique identifier of the user.

    Returns:
        User or None: The user entry if found, or None if not found.
    """
    result = await db.execute(select(User).filter(User.id == user_id))
    user = result.scalar_one_or_none()
    return user


async def get_user_by_email(db: AsyncSession, email: str):
    """
    Retrieve a user by their email address.

    Args:
        db (AsyncSession): The SQLAlchemy asynchronous database session.
        email (str): The email address of the user.

    Returns:
        User or None: The user entry if found, or None if not found.
    """
    result = await db.execute(select(User).filter(User.email == email))
    user = result.scalar_one_or_none()
    return user


async def get_all_users(db: AsyncSession):
    """
    Retrieve all users from the database.

    Args:
        db (AsyncSession): The SQLAlchemy asynchronous database session.

    Returns:
        list[User]: A list of all user entries.
    """
    result = await db.execute(select(User))
    return result.scalars().all()


async def delete_user(db: AsyncSession, user_id: int):
    """
    Delete a user by their ID.

    Args:
        db (AsyncSession): The SQLAlchemy asynchronous database session.
        user_id (int): The unique identifier of the user to delete.

    Returns:
        bool: True if the user was deleted, False if the user was not found.
    """
    result = await db.execute(select(User).filter(User.id == user_id))
    user = result.scalar_one_or_none()

    if user:
        await db.delete(user)
        await db.commit()
        return True
    return False


async def update_user_email(db: AsyncSession, user_id: int, new_email: str):
    """
    Update a user's email address.

    Args:
        db (AsyncSession): The SQLAlchemy asynchronous database session.
        user_id (int): The unique identifier of the user to update.
        new_email (str): The new email address for the user.

    Returns:
        User or None: The updated user entry if found, or None if not found.
    """
    result = await db.execute(select(User).filter(User.id == user_id))
    user = result.scalar_one_or_none()

    if user:
        user.email = new_email
        await db.commit()
        await db.refresh(user)
        return user
    return None
