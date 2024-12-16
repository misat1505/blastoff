from typing import Optional

from pydantic import BaseModel, Field


class RocketBase(BaseModel):
    name: str
    no_stages: Optional[int] = Field(
        ..., gt=0, description="Number of stages, must be a positive integer"
    )
    height: Optional[float] = None
    mass: Optional[float] = None
    diameter: Optional[float] = None
    description: Optional[str] = None
    launches_count: Optional[int] = Field(
        0, ge=0, description="Total number of launches"
    )
    successful_launches_count: Optional[int] = Field(
        0, ge=0, description="Number of successful launches"
    )
    failed_launches_count: Optional[int] = Field(
        0, ge=0, description="Number of failed launches"
    )
    landings_count: Optional[int] = Field(
        0, ge=0, description="Total number of landings"
    )
    successful_landings_count: Optional[int] = Field(
        0, ge=0, description="Number of successful landings"
    )
    failed_landings_count: Optional[int] = Field(
        0, ge=0, description="Number of failed landings"
    )
    pending_launches: Optional[int] = Field(
        0, ge=0, description="Total number of pending launches"
    )
    leo_capacity: Optional[float] = None
    gto_capacity: Optional[float] = None
    geo_capacity: Optional[float] = None
    sso_capacity: Optional[float] = None
    rocket_thrust: Optional[float] = None
    launch_cost: Optional[float] = None
    image_url: Optional[str] = None


class RocketCreate(RocketBase):
    id: int
    agency_id: int


class RocketResponse(RocketBase):
    id: int
    agency_id: int

    class Config:
        from_attributes = True
