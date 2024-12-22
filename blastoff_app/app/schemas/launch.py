from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field

from app.schemas.rocket import DetailedRocketResponse
from app.schemas.site import SiteResponse


class LaunchBase(BaseModel):
    last_updated: datetime = Field(..., description="Timestamp of last update")
    mission_name: Optional[str] = None
    status_name: Optional[str] = None
    status_description: Optional[str] = None
    date: Optional[datetime] = None
    description: Optional[str] = None
    url: Optional[str] = None
    image_url: Optional[str] = None


class LaunchCreate(LaunchBase):
    id: str
    rocket_id: int = Field(..., description="ID of the associated rocket")
    program_id: Optional[int] = Field(
        ..., description="ID of the associated program"
    )
    site_id: Optional[int] = Field(
        ..., description="ID of the associated site"
    )


class LaunchResponse(LaunchBase):
    id: str
    rocket_id: int
    program_id: Optional[int]
    site_id: Optional[int]

    class Config:
        from_attributes = True


class DetailedLaunchResponse(LaunchResponse):
    id: str
    rocket: Optional[DetailedRocketResponse]
    site: Optional[SiteResponse]

    class Config:
        from_attributes = True
