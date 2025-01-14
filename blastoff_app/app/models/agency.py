from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base


class Agency(Base):
    """
    Represents an agency that manages rockets and launches. This class
    corresponds to the 'agencies' table in the database.
    
    Attributes:
        id (int): The unique identifier for the agency.
        name (str): The name of the agency.
        country (str): The country in which the agency is located.
        description (str): A detailed description of the agency.
        website (str): The official website URL of the agency.
        image_url (str): The URL of the agency's logo or image.
    """

    __tablename__ = "agencies"

    id = Column(Integer, primary_key=True, index=True, default=1)
    name = Column(String(100))
    country = Column(String(100))
    description = Column(String(5000))
    website = Column(String(500))
    image_url = Column(String(500))

    favourite_agencies = relationship(
        "FavouriteAgency",
        back_populates="agency",
        cascade="all, delete-orphan",
    )
    """
    Represents a one-to-many relationship with the `FavouriteAgency` model.
    An agency can have many users who mark it as their favorite. This relationship
    is optional, meaning that there might not be any favorite entries for an agency.
    When an agency is deleted, its associated favorite records are also deleted.
    """

    rockets = relationship(
        "Rocket", back_populates="agency", cascade="all, delete-orphan"
    )
    """
    Represents a one-to-many relationship with the `Rocket` model.
    An agency can manage multiple rockets. This relationship is optional,
    meaning that an agency might not manage any rockets. When an agency is deleted,
    its associated rockets are also deleted.
    """
