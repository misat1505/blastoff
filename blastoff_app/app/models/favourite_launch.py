from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class FavouriteLaunch(Base):
    __tablename__ = "favourite_launches"

    id = Column(Integer, primary_key=True, index=True)
    added_at = Column(DateTime, default=func.now())
    user_id = Column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    launch_id = Column(
        String(500),
        ForeignKey("launches.id", ondelete="CASCADE"),
        nullable=False,
    )

    user = relationship("User", back_populates="favourite_launches")
    launch = relationship("Launch", back_populates="favourite_launches")
