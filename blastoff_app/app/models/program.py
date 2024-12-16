from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from app.database import Base


class Program(Base):
    __tablename__ = "programs"

    id = Column(String(500), primary_key=True, index=True)
    name = Column(String(100), nullable=False, unique=True)
    description = Column(String(500))
    website = Column(String(250))
    image_url = Column(String(250))

    launches = relationship(
        "Launch", back_populates="program", cascade="all, delete-orphan"
    )
