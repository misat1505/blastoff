from app.database import Base
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, index=True)
    email = Column(String(100), unique=True, index=True)
    hashed_password = Column(String(500))
    created_at = Column(DateTime, default=func.now())

    favourite_agencies = relationship(
        "FavouriteAgency", back_populates="user", cascade="all, delete-orphan"
    )

    favourite_launches = relationship(
        "FavouriteLaunch", back_populates="user", cascade="all, delete-orphan"
    )

    comments = relationship(
        "Comment", back_populates="user", cascade="all, delete-orphan"
    )
