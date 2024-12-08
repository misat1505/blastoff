from app.database import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship


class Agency(Base):
    __tablename__ = "agencies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True)
    country = Column(String(50))
    description = Column(String(500))
    website = Column(String(500))
    image_url = Column(String(500))

    favourite_agencies = relationship(
        "FavouriteAgency", back_populates="agency", cascade="all, delete-orphan"
    )

    rockets = relationship(
        "Rocket", back_populates="agency", cascade="all, delete-orphan"
    )
