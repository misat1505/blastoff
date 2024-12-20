from app.database import Base
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship


class Rocket(Base):
    __tablename__ = "rockets"

    id = Column(Integer, primary_key=True, index=True, default=1)
    name = Column(String(100), unique=True, index=True)
    agency_id = Column(Integer, ForeignKey("agencies.id"), nullable=False)
    no_stages = Column(Integer)
    height = Column(Float)
    mass = Column(Float)
    diameter = Column(Float)
    description = Column(String(5000))
    launches_count = Column(Integer)
    successful_launches_count = Column(Integer)
    failed_launches_count = Column(Integer)
    landings_count = Column(Integer)
    successful_landings_count = Column(Integer)
    failed_landings_count = Column(Integer)
    pending_launches = Column(Integer)
    leo_capacity = Column(Float)
    gto_capacity = Column(Float)
    geo_capacity = Column(Float)
    sso_capacity = Column(Float)
    rocket_thrust = Column(Float)
    launch_cost = Column(Float)
    image_url = Column(String(500))

    agency = relationship("Agency", back_populates="rockets")
    launches = relationship(
        "Launch", back_populates="rocket", cascade="all, delete-orphan"
    )
