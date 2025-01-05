from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from app.schemas.user import UserResponse


class CommentBase(BaseModel):
    text: str


class CommentCreateBody(CommentBase):
    launch_id: str
    parent_comment_id: Optional[int] = None


class CommentCreate(CommentBase):
    user_id: int
    launch_id: str
    parent_comment_id: Optional[int] = None


class CommentResponse(CommentBase):
    id: int
    added_at: datetime
    user: UserResponse
    launch_id: str
    parent_comment_id: Optional[int] = None

    class Config:
        from_attributes = True
