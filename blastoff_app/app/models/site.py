from sqlalchemy import Column, Float, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base


class Site(Base):
    __tablename__ = "sites"

    id = Column(Integer, primary_key=True, index=True, default=1)
    name = Column(String(100), unique=True, index=True, nullable=False)
    country = Column(String(100), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    description = Column(String(5000))
    image_url = Column(String(500))
    map_image_url = Column(String(500))

    launches = relationship("Launch", back_populates="site")
