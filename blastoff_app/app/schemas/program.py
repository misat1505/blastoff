from typing import Optional

from pydantic import BaseModel, Field


class ProgramBase(BaseModel):
    """
    Base model for program data.

    This model contains common attributes for a space program, such as its name,
    description, website, and associated image URL.

    Attributes:
        name (str): The name of the program.
        description (Optional[str]): A brief description of the program.
        website (Optional[str]): URL linking to more details about the program.
        image_url (Optional[str]): Image URL related to the program.
    """

    name: str = Field(..., description="Name of the program")
    description: Optional[str] = None
    website: Optional[str] = None
    image_url: Optional[str] = None


class ProgramCreate(ProgramBase):
    """
    Model for creating a new program.

    This model extends `ProgramBase` and adds an `id` attribute that is required
    for creating a new program in the system.

    Attributes:
        id (int): The unique identifier of the program.
    """

    id: int


class ProgramResponse(ProgramBase):
    """
    Model for program response data.

    This model is used for API responses when retrieving program data. It includes
    the program's ID and inherits from `ProgramBase`.

    Attributes:
        id (int): The unique identifier of the program.

    Config:
        from_attributes (bool): Specifies to Pydantic to use object attributes
        instead of dictionary keys for data mapping.
    """

    id: int

    class Config:
        from_attributes = True
