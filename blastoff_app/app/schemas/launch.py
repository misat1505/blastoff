from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


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
    rocket_id: str = Field(..., description="ID of the associated rocket")
    program_id: Optional[str] = Field(..., description="ID of the associated program")
    site_id: Optional[str] = Field(..., description="ID of the associated site")


class LaunchResponse(LaunchBase):
    id: str
    rocket_id: str
    program_id: Optional[str]
    site_id: Optional[str]

    class Config:
        from_attributes = True
