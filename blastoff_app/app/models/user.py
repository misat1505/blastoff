from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class User(Base):
    """
    Represents a user in the system. This class corresponds to the 'users' table in the database.

    Attributes:
        id (int): The unique identifier for the user.
        username (str): The username of the user, must be unique.
        email (str): The email address of the user, must be unique.
        hashed_password (str): The hashed password of the user.
        created_at (datetime): The date and time when the user account was created.
    """

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, index=True)
    email = Column(String(100), unique=True, index=True)
    hashed_password = Column(String(500))
    created_at = Column(DateTime(timezone=True), default=func.now())

    favourite_agencies = relationship(
        "FavouriteAgency", back_populates="user", cascade="all, delete-orphan"
    )
    """
    Represents a one-to-many relationship with the `FavouriteAgency` model.
    A user can have many favorite agencies. This relationship is optional,
    meaning that a user might not have any favorite agencies. When a user is deleted,
    their associated favourite agencies are also deleted.
    """

    favourite_launches = relationship(
        "FavouriteLaunch", back_populates="user", cascade="all, delete-orphan"
    )
    """
    Represents a one-to-many relationship with the `FavouriteLaunch` model.
    A user can have many favourite launches. This relationship is optional,
    meaning that a user might not have any favourite launches. When a user is deleted,
    their associated favourite launches are also deleted.
    """

    comments = relationship(
        "Comment", back_populates="user", cascade="all, delete-orphan"
    )
    """
    Represents a one-to-many relationship with the `Comment` model.
    A user can write many comments on launches or agencies. This relationship is optional,
    meaning that a user might not have any comments. When a user is deleted,
    their associated comments are also deleted.
    """
