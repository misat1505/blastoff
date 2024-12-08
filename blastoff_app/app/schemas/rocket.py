from pydantic import BaseModel, Field
from typing import Optional


class RocketBase(BaseModel):
    name: str
    no_stages: int = Field(
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
    leo_capacity: Optional[float] = None
    gto_capacity: Optional[float] = None
    geo_capacity: Optional[float] = None
    sso_capacity: Optional[float] = None
    image_url: Optional[str] = None


class RocketCreate(RocketBase):
    agency_id: int


class RocketResponse(RocketBase):
    id: int
    agency_id: int

    class Config:
        from_attributes = True
