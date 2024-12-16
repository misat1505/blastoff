from app.database import Base
from sqlalchemy import Column, String, Float
from sqlalchemy.orm import relationship


class Site(Base):
    __tablename__ = "sites"

    id = Column(String(500), primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True, nullable=False)
    country = Column(String(100), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    description = Column(String(500))
    image_url = Column(String(500))
    map_image_url = Column(String(500))

    launches = relationship("Launch", back_populates="site")
