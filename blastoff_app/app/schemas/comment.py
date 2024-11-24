from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List


class CommentBase(BaseModel):
    text: str


class CommentCreate(CommentBase):
    user_id: int
    launch_id: int
    parent_comment_id: Optional[int] = None


class CommentResponse(CommentBase):
    id: int
    added_at: datetime
    user_id: int
    launch_id: int
    parent_comment_id: Optional[int] = None
    replies: Optional[List["CommentResponse"]] = None

    class Config:
        from_attributes = True