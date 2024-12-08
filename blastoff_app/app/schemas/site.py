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
    pass


class SiteResponse(SiteBase):
    id: int

    class Config:
        from_attributes = True
