from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class Launch(Base):
    __tablename__ = "launches"

    id = Column(Integer, primary_key=True, index=True)
    mission_name = Column(String(100), nullable=False)
    status = Column(String(50), nullable=False)
    date = Column(DateTime)
    description = Column(String(250))
    url = Column(String(250))
    image_url = Column(String(250))

    rocket_id = Column(Integer, ForeignKey("rockets.id"), nullable=False)
    rocket = relationship("Rocket", back_populates="launches")