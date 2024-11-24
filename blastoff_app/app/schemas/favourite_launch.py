from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class FavouriteLaunchBase(BaseModel):
    user_id: int
    launch_id: int


class FavouriteLaunchCreate(FavouriteLaunchBase):
    pass


class FavouriteLaunch(FavouriteLaunchBase):
    id: int
    added_at: datetime

    class Config:
        from_attributes = True


class FavouriteLaunchDelete(BaseModel):
    user_id: Optional[int] = None
    launch_id: Optional[int] = None
