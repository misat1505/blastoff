from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from app.schemas.user import UserResponse


class CommentBase(BaseModel):
    """
    Base model for comment data.

    This model contains the common attributes shared between all comment models,
    including the text content of the comment.

    Attributes:
        text (str): The content of the comment.
    """

    text: str


class CommentCreateBody(CommentBase):
    """
    Model for creating a comment with launch and optional parent comment.

    This model is used to create a comment by providing the text, launch ID,
    and an optional parent comment ID.

    Attributes:
        launch_id (str): The ID of the launch associated with the comment.
        parent_comment_id (Optional[int]): The ID of the parent comment, if this
        is a reply to an existing comment (optional).
    """

    launch_id: str
    parent_comment_id: Optional[int] = None


class CommentCreate(CommentBase):
    """
    Model for creating a comment with user, launch, and optional parent comment.

    This model is used to create a comment by providing the user ID, launch ID,
    the text, and an optional parent comment ID.

    Attributes:
        user_id (int): The ID of the user creating the comment.
        launch_id (str): The ID of the launch associated with the comment.
        parent_comment_id (Optional[int]): The ID of the parent comment, if this
        is a reply to an existing comment (optional).
    """

    user_id: int
    launch_id: str
    parent_comment_id: Optional[int] = None


class CommentResponse(CommentBase):
    """
    Model representing the response for a comment, including additional details.

    This model is used to represent a comment that has been retrieved from the
    database, including the comment ID, timestamp, user information, and launch
    association.

    Attributes:
        id (int): The unique identifier of the comment.
        added_at (datetime): The timestamp when the comment was added.
        user (UserResponse): The user who created the comment.
        launch_id (str): The ID of the launch associated with the comment.
        parent_comment_id (Optional[int]): The ID of the parent comment, if this
        is a reply to an existing comment (optional).

    Config:
        from_attributes (bool): Instructs Pydantic to read values from object
        attributes instead of dictionary keys.
    """

    id: int
    added_at: datetime
    user: UserResponse
    launch_id: str
    parent_comment_id: Optional[int] = None

    class Config:
        from_attributes = True
