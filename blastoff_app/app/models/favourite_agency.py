from sqlalchemy import Column, DateTime, ForeignKey, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class FavouriteAgency(Base):
    """
    Represents a user's favorite agency. This class corresponds to the 'favourite_agencies' table in the database.
    
    Attributes:
        id (int): The unique identifier for the favorite agency entry.
        added_at (datetime): The timestamp when the favorite agency was added.
        user_id (int): The ID of the user who marked the agency as favorite.
        agency_id (int): The ID of the agency that is marked as a favorite.
    """

    __tablename__ = "favourite_agencies"

    id = Column(Integer, primary_key=True, index=True)
    added_at = Column(DateTime(timezone=True), default=func.now())
    user_id = Column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    agency_id = Column(
        Integer, ForeignKey("agencies.id", ondelete="CASCADE"), nullable=False
    )

    user = relationship("User", back_populates="favourite_agencies")
    """
    Represents a many-to-one relationship with the `User` model.
    A user can mark many agencies as favorites. This relationship is required,
    meaning that each favorite agency must be linked to a user.
    """

    agency = relationship("Agency", back_populates="favourite_agencies")
    """
    Represents a many-to-one relationship with the `Agency` model.
    An agency can be marked as a favorite by many users. This relationship is required,
    meaning that each favorite entry must be associated with an agency.
    """
