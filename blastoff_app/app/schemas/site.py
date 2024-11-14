from pydantic import BaseModel
from typing import Optional


class SiteBase(BaseModel):
    name: str
    location: Optional[str] = None
    description: Optional[str] = None


class SiteCreate(SiteBase):
    pass


class SiteResponse(SiteBase):
    id: int

    class Config:
        from_attributes = True
