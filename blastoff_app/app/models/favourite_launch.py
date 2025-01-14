from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class FavouriteLaunch(Base):
    """
    Represents a user's favorite launch. This class corresponds to the 'favourite_launches' table in the database.
    
    Attributes:
        id (int): The unique identifier for the favorite launch entry.
        added_at (datetime): The timestamp when the favorite launch was added.
        user_id (int): The ID of the user who marked the launch as favorite.
        launch_id (str): The ID of the launch that is marked as a favorite.
    """

    __tablename__ = "favourite_launches"

    id = Column(Integer, primary_key=True, index=True)
    added_at = Column(DateTime(timezone=True), default=func.now())
    user_id = Column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    launch_id = Column(
        String(500),
        ForeignKey("launches.id", ondelete="CASCADE"),
        nullable=False,
    )

    user = relationship("User", back_populates="favourite_launches")
    """
    Represents a many-to-one relationship with the `User` model.
    A user can mark many launches as favorites. This relationship is required,
    meaning that each favorite launch must be linked to a user.
    """

    launch = relationship("Launch", back_populates="favourite_launches")
    """
    Represents a many-to-one relationship with the `Launch` model.
    A launch can be marked as a favorite by many users. This relationship is required,
    meaning that each favorite entry must be associated with a launch.
    """
