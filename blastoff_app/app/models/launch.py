from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base


class Launch(Base):
    """
    Represents a rocket launch event. This class corresponds to the 'launches' table in the database.
    
    Attributes:
        id (str): The unique identifier for the launch.
        last_updated (datetime): The timestamp of the last update for the launch details.
        mission_name (str): The name of the mission.
        status_name (str): The status of the launch.
        status_description (str): A detailed description of the launch status.
        date (datetime): The scheduled or actual date and time of the launch.
        description (str): A detailed description of the launch event.
        url (str): The URL to the official launch page or details.
        image_url (str): The URL to an image related to the launch.
    """

    __tablename__ = "launches"

    id = Column(String(500), primary_key=True, index=True)
    last_updated = Column(DateTime(timezone=True), nullable=False)
    mission_name = Column(String(100))
    status_name = Column(String(100))
    status_description = Column(String(5000))
    date = Column(DateTime(timezone=True))
    description = Column(String(5000))
    url = Column(String(500))
    image_url = Column(String(500))

    rocket_id = Column(Integer, ForeignKey("rockets.id"), nullable=False)
    program_id = Column(Integer, ForeignKey("programs.id"))
    site_id = Column(Integer, ForeignKey("sites.id"))

    rocket = relationship("Rocket", back_populates="launches")
    """
    Represents a many-to-one relationship with the `Rocket` model.
    A launch is associated with a single rocket. This relationship is required,
    meaning that every launch must have a corresponding rocket.
    """

    program = relationship("Program", back_populates="launches")
    """
    Represents a many-to-one relationship with the `Program` model.
    A launch can belong to a space program. This relationship is optional,
    meaning that not every launch is necessarily part of a program.
    """

    site = relationship("Site", back_populates="launches")
    """
    Represents a many-to-one relationship with the `Site` model.
    A launch takes place at a specific launch site. This relationship is optional,
    meaning that a launch might not have a linked site in some cases.
    """

    favourite_launches = relationship(
        "FavouriteLaunch",
        back_populates="launch",
        cascade="all, delete-orphan",
    )
    """
    Represents a one-to-many relationship with the `FavouriteLaunch` model.
    A launch can be marked as a favorite by multiple users. This relationship is optional,
    meaning that not all launches will have any favorites associated with them.
    When a launch is deleted, its related favorite records are also deleted.
    """

    comments = relationship(
        "Comment", back_populates="launch", cascade="all, delete-orphan"
    )
    """
    Represents a one-to-many relationship with the `Comment` model.
    A launch can have many comments from users. This relationship is optional,
    meaning that some launches may not have any comments. When a launch is deleted,
    its related comments are also deleted.
    """
