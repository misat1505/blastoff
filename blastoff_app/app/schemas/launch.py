from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class LaunchBase(BaseModel):
    api_id: str = Field(..., description="ID from external API")
    last_updated: datetime = Field(..., description="Timestamp of last update")
    mission_name: Optional[str] = None
    status_name: Optional[str] = None
    status_description: Optional[str] = None
    date: Optional[datetime] = None
    description: Optional[str] = None
    url: Optional[str] = None
    image_url: Optional[str] = None


class LaunchCreate(LaunchBase):
    rocket_id: int = Field(..., description="ID of the associated rocket")
    program_id: Optional[int] = Field(..., description="ID of the associated program")
    site_id: Optional[int] = Field(..., description="ID of the associated site")


class LaunchResponse(LaunchBase):
    id: int
    rocket_id: int
    program_id: int
    site_id: int

    class Config:
        from_attributes = True
