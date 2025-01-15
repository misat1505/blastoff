from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class FavouriteLaunchBase(BaseModel):
    """
    Base model for favourite launch data.

    This model contains the common attributes for handling favourite launch
    information, specifically the `launch_id`.

    Attributes:
        launch_id (str): The ID of the launch that is marked as a favourite.
    """

    launch_id: str


class FavouriteLaunchCreate(FavouriteLaunchBase):
    """
    Model for creating a new favourite launch.

    This model is used when creating a new favourite launch, inheriting the
    common attributes from `FavouriteLaunchBase`.

    Attributes:
        launch_id (str): The ID of the launch to be added to favourites.
    """

    pass


class FavouriteLaunch(FavouriteLaunchBase):
    """
    Model representing a favourite launch with additional details.

    This model is used when a favourite launch is retrieved from the database,
    including the ID, timestamp when it was added, and user ID.

    Attributes:
        id (int): The unique identifier of the favourite launch.
        added_at (datetime): The timestamp when the launch was added to favourites.
        user_id (int): The ID of the user who added the launch to their favourites.

    Config:
        from_attributes (bool): Instructs Pydantic to read values from object
        attributes instead of dictionary keys.
    """

    id: int
    added_at: datetime
    user_id: int

    class Config:
        from_attributes = True


class FavouriteLaunchDelete(BaseModel):
    """
    Model for deleting a favourite launch.

    This model is used when deleting a favourite launch by providing either the
    `user_id` or `launch_id` (or both) to specify which launch to remove.

    Attributes:
        user_id (Optional[int]): The ID of the user removing the favourite launch (optional).
        launch_id (Optional[str]): The ID of the launch being removed from favourites (optional).
    """

    user_id: Optional[int] = None
    launch_id: Optional[str] = None
