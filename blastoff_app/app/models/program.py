from app.database import Base
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship


class Program(Base):
    __tablename__ = "programs"

    id = Column(Integer, primary_key=True, index=True, default=1)
    name = Column(String(100), nullable=False, unique=True)
    description = Column(String(500))
    website = Column(String(250))
    image_url = Column(String(250))

    launches = relationship(
        "Launch", back_populates="program", cascade="all, delete-orphan"
    )
