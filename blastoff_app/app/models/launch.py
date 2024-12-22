from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base


class Launch(Base):
    __tablename__ = "launches"

    id = Column(String(500), primary_key=True, index=True)
    last_updated = Column(DateTime, nullable=False)
    mission_name = Column(String(100))
    status_name = Column(String(100))
    status_description = Column(String(5000))
    date = Column(DateTime)
    description = Column(String(5000))
    url = Column(String(500))
    image_url = Column(String(500))

    rocket_id = Column(Integer, ForeignKey("rockets.id"), nullable=False)
    program_id = Column(Integer, ForeignKey("programs.id"))
    site_id = Column(Integer, ForeignKey("sites.id"))

    rocket = relationship("Rocket", back_populates="launches")
    program = relationship("Program", back_populates="launches")
    site = relationship("Site", back_populates="launches")
    favourite_launches = relationship(
        "FavouriteLaunch",
        back_populates="launch",
        cascade="all, delete-orphan",
    )
    comments = relationship(
        "Comment", back_populates="launch", cascade="all, delete-orphan"
    )
