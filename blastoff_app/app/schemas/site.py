from pydantic import BaseModel
from typing import Optional


class SiteBase(BaseModel):
    name: str
    country: str
    latitude: float
    longitude: float
    description: Optional[str] = None
    image_url: Optional[str] = None
    map_image_url: Optional[str] = None


class SiteCreate(SiteBase):
    id: str


class SiteResponse(SiteBase):
    id: str

    class Config:
        from_attributes = True
