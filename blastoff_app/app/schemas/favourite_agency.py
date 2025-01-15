from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class FavouriteAgencyBase(BaseModel):
    """
    Base model for favourite agency data.

    This model contains the common attributes for handling favourite agency
    information, specifically the `agency_id`.

    Attributes:
        agency_id (int): The ID of the agency that is marked as a favourite.
    """

    agency_id: int


class FavouriteAgencyCreate(FavouriteAgencyBase):
    """
    Model for creating a new favourite agency.

    This model is used when creating a new favourite agency, inheriting the
    common attributes from `FavouriteAgencyBase`.

    Attributes:
        agency_id (int): The ID of the agency to be added to favourites.
    """

    pass


class FavouriteAgency(FavouriteAgencyBase):
    """
    Model representing a favourite agency with additional details.

    This model is used when a favourite agency is retrieved from the database,
    including the ID, timestamp when it was added, and user ID.

    Attributes:
        id (int): The unique identifier of the favourite agency.
        added_at (datetime): The timestamp when the agency was added to favourites.
        user_id (int): The ID of the user who added the agency to their favourites.

    Config:
        from_attributes (bool): Instructs Pydantic to read values from object
        attributes instead of dictionary keys.
    """

    id: int
    added_at: datetime
    user_id: int

    class Config:
        from_attributes = True


class FavouriteAgencyDelete(BaseModel):
    """
    Model for deleting a favourite agency.

    This model is used when deleting a favourite agency by providing either the
    `user_id` or `agency_id` (or both) to specify which agency to remove.

    Attributes:
        user_id (Optional[int]): The ID of the user removing the favourite agency (optional).
        agency_id (Optional[int]): The ID of the agency being removed from favourites (optional).
    """

    user_id: Optional[int] = None
    agency_id: Optional[int] = None
