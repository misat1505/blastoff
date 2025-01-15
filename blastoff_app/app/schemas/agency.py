from typing import Optional

from pydantic import BaseModel


class AgencyBase(BaseModel):
    """
    Base model for agency data.

    This model represents the common fields shared between agency creation
    and agency response models.

    Attributes:
        name (str): The name of the agency.
        country (str): The country where the agency is based.
        description (str): A brief description of the agency.
        website (Optional[str]): The website URL of the agency (optional).
        image_url (Optional[str]): The URL of the agency's image (optional).
    """

    name: str
    country: str
    description: str
    website: Optional[str]
    image_url: Optional[str]


class AgencyCreate(AgencyBase):
    """
    Model for creating a new agency.

    This model is used when creating an agency, including the necessary
    fields for saving the agency in the database.

    Attributes:
        id (int): The unique identifier of the agency.
    """

    id: int


class AgencyResponse(AgencyBase):
    """
    Model for the agency response.

    This model is used to represent the data returned when retrieving an
    agency from the database, including the agency's unique identifier.

    Attributes:
        id (int): The unique identifier of the agency.

    Config:
        from_attributes (bool): Indicates that Pydantic should read
        values from object attributes instead of dictionary keys.
    """

    id: int

    class Config:
        from_attributes = True
