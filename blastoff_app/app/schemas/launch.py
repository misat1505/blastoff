from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class LaunchBase(BaseModel):
    mission_name: str = Field(..., description="Name of the mission")
    status: str = Field(..., description="Current status of the launch")
    date: Optional[datetime] = None
    description: Optional[str] = None
    url: Optional[str] = None
    image_url: Optional[str] = None


class LaunchCreate(LaunchBase):
    rocket_id: int = Field(..., description="ID of the associated rocket")
    program_id: int = Field(..., description="ID of the associated program")
    site_id: int = Field(..., description="ID of the associated site")


class LaunchResponse(LaunchBase):
    id: int
    rocket_id: int

    class Config:
        from_attributes = True
