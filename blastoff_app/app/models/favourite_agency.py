from app.database import Base
from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func


class FavouriteAgency(Base):
    __tablename__ = "favourite_agencies"

    id = Column(Integer, primary_key=True, index=True)
    added_at = Column(DateTime, default=func.now())
    user_id = Column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    agency_id = Column(
        Integer, ForeignKey("agencies.id", ondelete="CASCADE"), nullable=False
    )

    user = relationship("User", back_populates="favourite_agencies")
    agency = relationship("Agency", back_populates="favourite_agencies")
