from typing import Optional

from pydantic import BaseModel


class SiteBase(BaseModel):
    """
    Base model for site data.

    This model contains the common attributes of a site, such as its name, country,
    geographical location (latitude and longitude), and description.

    Attributes:
        name (str): The name of the site.
        country (str): The country where the site is located.
        latitude (float): The latitude of the site.
        longitude (float): The longitude of the site.
        description (Optional[str]): A description of the site.
        image_url (Optional[str]): A URL to an image of the site.
        map_image_url (Optional[str]): A URL to a map image of the site.
    """

    name: str
    country: str
    latitude: float
    longitude: float
    description: Optional[str] = None
    image_url: Optional[str] = None
    map_image_url: Optional[str] = None


class SiteCreate(SiteBase):
    """
    Model for creating a new site.

    This model extends `SiteBase` and includes an `id` attribute that is required
    when creating a new site.

    Attributes:
        id (int): The unique identifier for the site.
    """

    id: int


class SiteResponse(SiteBase):
    """
    Model for site response data.

    This model is used for API responses when retrieving site data. It includes the
    site's ID and inherits from `SiteBase`.

    Attributes:
        id (int): The unique identifier of the site.

    Config:
        from_attributes (bool): Specifies to Pydantic to use object attributes
        instead of dictionary keys for data mapping.
    """

    id: int

    class Config:
        from_attributes = True
