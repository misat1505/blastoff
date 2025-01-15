from sqlalchemy import Column, Float, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base


class Site(Base):
    """
    Represents a launch site used for rocket launches. This class corresponds
    to the 'sites' table in the database.

    Attributes:
        id (int): The unique identifier for the site.
        name (str): The name of the launch site.
        country (str): The country in which the site is located.
        latitude (float): The latitude of the site.
        longitude (float): The longitude of the site.
        description (str): A detailed description of the site.
        image_url (str): The URL of the site's image.
        map_image_url (str): The URL of the map image showing the site location.
    """

    __tablename__ = "sites"

    id = Column(Integer, primary_key=True, index=True, default=1)
    name = Column(String(100), nullable=False)
    country = Column(String(100), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    description = Column(String(5000))
    image_url = Column(String(500))
    map_image_url = Column(String(500))

    launches = relationship("Launch", back_populates="site")
    """
    Represents a one-to-many relationship with the `Launch` model.
    A site can be used for multiple rocket launches. This relationship is optional,
    meaning that a site may not have any associated launches. When a site is deleted,
    its associated launches remain in the database.
    """
