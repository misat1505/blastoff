from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base


class Program(Base):
    """
    Represents a space program or mission. This class corresponds to the 'programs' table in the database.
    
    Attributes:
        id (int): The unique identifier for the program.
        name (str): The name of the program or mission.
        description (str): A detailed description of the program or mission.
        website (str): The official website of the program.
        image_url (str): The URL to an image related to the program or mission.
    """

    __tablename__ = "programs"

    id = Column(Integer, primary_key=True, index=True, default=1)
    name = Column(String(100), nullable=False)
    description = Column(String(5000))
    website = Column(String(500))
    image_url = Column(String(500))

    launches = relationship(
        "Launch", back_populates="program", cascade="all, delete-orphan"
    )
    """
    Represents a one-to-many relationship with the `Launch` model.
    A program can have multiple launches associated with it. This relationship is optional,
    meaning that not all programs will have launches. When a program is deleted,
    its associated launches are also deleted.
    """
