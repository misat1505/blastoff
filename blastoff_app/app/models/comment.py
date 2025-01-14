from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, func
from sqlalchemy.orm import relationship

from app.database import Base


class Comment(Base):
    """
    Represents a comment made by a user on a specific launch or agency.
    This class corresponds to the 'comments' table in the database.

    Attributes:
        id (int): The unique identifier for the comment.
        text (str): The content of the comment.
        added_at (datetime): The timestamp when the comment was added.
        user_id (int): The ID of the user who posted the comment.
        launch_id (str): The ID of the launch this comment refers to.
        parent_comment_id (int): The ID of the parent comment if this is a reply.
    """

    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String(5000), nullable=False)
    added_at = Column(DateTime(timezone=True), default=func.now())
    user_id = Column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    launch_id = Column(
        String(500),
        ForeignKey("launches.id", ondelete="CASCADE"),
        nullable=False,
    )
    parent_comment_id = Column(
        Integer, ForeignKey("comments.id", ondelete="CASCADE"), nullable=True
    )

    user = relationship("User", back_populates="comments")
    """
    Represents a many-to-one relationship with the `User` model.
    A comment is associated with one user who made it. This relationship is
    required, as each comment must be linked to a user.
    """

    launch = relationship("Launch", back_populates="comments")
    """
    Represents a many-to-one relationship with the `Launch` model.
    A comment is associated with one launch. This relationship is required,
    as each comment must be related to a specific launch.
    """

    parent_comment = relationship(
        "Comment", back_populates="replies", remote_side=[id]
    )
    """
    Represents a self-referential relationship to the `Comment` model.
    A comment can be a reply to another comment. This relationship is optional,
    meaning that a comment might not have a parent comment (e.g., root comments).
    """

    replies = relationship(
        "Comment",
        back_populates="parent_comment",
        cascade="all, delete-orphan",
    )
    """
    Represents a one-to-many relationship with the `Comment` model.
    A comment can have multiple replies, forming a thread of comments. This relationship
    is optional, meaning that a comment might not have any replies.
    When a comment is deleted, its associated replies are also deleted.
    """
