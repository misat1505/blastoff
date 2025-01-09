from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base


class Program(Base):
    __tablename__ = "programs"

    id = Column(Integer, primary_key=True, index=True, default=1)
    name = Column(String(100), nullable=False)
    description = Column(String(5000))
    website = Column(String(500))
    image_url = Column(String(500))

    launches = relationship(
        "Launch", back_populates="program", cascade="all, delete-orphan"
    )
