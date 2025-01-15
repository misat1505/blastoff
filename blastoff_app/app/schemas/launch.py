from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field

from app.schemas.rocket import DetailedRocketResponse
from app.schemas.site import SiteResponse


class LaunchBase(BaseModel):
    """
    Base model for launch data.

    This model is used for common attributes of a launch such as mission name,
    status, description, and related timestamps.

    Attributes:
        last_updated (datetime): Timestamp when the launch was last updated.
        mission_name (Optional[str]): Name of the mission.
        status_name (Optional[str]): Current status name of the launch.
        status_description (Optional[str]): Description of the current launch status.
        date (Optional[datetime]): Date of the launch.
        description (Optional[str]): Description of the launch.
        url (Optional[str]): URL linking to more details about the launch.
        image_url (Optional[str]): Image URL related to the launch.
    """

    last_updated: datetime = Field(..., description="Timestamp of last update")
    mission_name: Optional[str] = None
    status_name: Optional[str] = None
    status_description: Optional[str] = None
    date: Optional[datetime] = None
    description: Optional[str] = None
    url: Optional[str] = None
    image_url: Optional[str] = None


class LaunchCreate(LaunchBase):
    """
    Model for creating a new launch.

    This model inherits from `LaunchBase` and includes additional fields
    required to create a new launch, such as the associated rocket, program,
    and site.

    Attributes:
        id (str): The unique identifier of the launch.
        rocket_id (int): The ID of the associated rocket.
        program_id (Optional[int]): The ID of the associated program.
        site_id (Optional[int]): The ID of the associated site.
    """

    id: str
    rocket_id: int = Field(..., description="ID of the associated rocket")
    program_id: Optional[int] = Field(
        ..., description="ID of the associated program"
    )
    site_id: Optional[int] = Field(
        ..., description="ID of the associated site"
    )


class LaunchResponse(LaunchBase):
    """
    Model for a launch response.

    This model is used to return launch data with its associated rocket,
    program, and site IDs. Inherits from `LaunchBase`.

    Attributes:
        id (str): The unique identifier of the launch.
        rocket_id (int): The ID of the associated rocket.
        program_id (Optional[int]): The ID of the associated program.
        site_id (Optional[int]): The ID of the associated site.

    Config:
        from_attributes (bool): Specifies to Pydantic to use object attributes
        instead of dictionary keys for data mapping.
    """

    id: str
    rocket_id: int
    program_id: Optional[int]
    site_id: Optional[int]

    class Config:
        from_attributes = True


class DetailedLaunchResponse(LaunchResponse):
    """
    Model for detailed launch response.

    This model extends `LaunchResponse` and includes additional information
    about the launch's rocket and site.

    Attributes:
        id (str): The unique identifier of the launch.
        rocket (Optional[DetailedRocketResponse]): Detailed information about
        the associated rocket.
        site (Optional[SiteResponse]): Detailed information about the associated site.

    Config:
        from_attributes (bool): Specifies to Pydantic to use object attributes
        instead of dictionary keys for data mapping.
    """

    id: str
    rocket: Optional[DetailedRocketResponse]
    site: Optional[SiteResponse]

    class Config:
        from_attributes = True
