from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String(500), nullable=False)
    added_at = Column(DateTime, default=func.now())
    user_id = Column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    launch_id = Column(
        Integer, ForeignKey("launches.id", ondelete="CASCADE"), nullable=False
    )
    parent_comment_id = Column(
        Integer, ForeignKey("comments.id", ondelete="CASCADE"), nullable=True
    )

    user = relationship("User", back_populates="comments")
    launch = relationship("Launch", back_populates="comments")
    parent_comment = relationship("Comment", back_populates="replies", remote_side=[id])
    replies = relationship("Comment", back_populates="parent_comment", cascade="all, delete-orphan")

