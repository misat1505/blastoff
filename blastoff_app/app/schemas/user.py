from datetime import datetime

from pydantic import BaseModel


class UserBase(BaseModel):
    """
    Base model for user data.

    This model contains the common attributes for a user, such as their username
    and email. It is used for creating new users and handling responses for
    user-related operations.

    Attributes:
        username (str): The username of the user.
        email (str): The email address of the user.
    """

    username: str
    email: str


class UserCreate(UserBase):
    """
    Model for creating a new user.

    This model extends `UserBase` and includes the `password` attribute, which
    is required for user creation. The password is expected to be stored securely.

    Attributes:
        password (str): The password for the new user.
    """

    password: str


class UserLogin(BaseModel):
    """
    Model for user login data.

    This model includes the user's email and password, which are used for
    authentication during login.

    Attributes:
        email (str): The email address of the user attempting to log in.
        password (str): The password of the user attempting to log in.
    """

    email: str
    password: str


class UserResponse(UserBase):
    """
    Model for user response data.

    This model is used for API responses when retrieving user data, and it includes
    additional information such as the user's `id` and `created_at` timestamp.

    Attributes:
        id (int): The unique identifier for the user.
        created_at (datetime): The timestamp of when the user was created.

    Config:
        from_attributes (bool): Specifies to Pydantic to use object attributes
        instead of dictionary keys for data mapping.
    """

    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class UserEmailUpdate(BaseModel):
    """
    Model for updating a user's email address.

    This model contains the email address that will replace the existing one
    for a user when updating their email.

    Attributes:
        email (str): The new email address for the user.
    """

    email: str
