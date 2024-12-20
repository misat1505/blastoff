from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class FavouriteAgencyBase(BaseModel):
    user_id: int
    agency_id: int


class FavouriteAgencyCreate(FavouriteAgencyBase):
    pass


class FavouriteAgency(FavouriteAgencyBase):
    id: int
    added_at: datetime

    class Config:
        from_attributes = True


class FavouriteAgencyDelete(BaseModel):
    user_id: Optional[int] = None
    agency_id: Optional[int] = None
