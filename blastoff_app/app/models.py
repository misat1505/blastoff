from sqlalchemy import Column, Integer, String, ForeignKey, Table, Text
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    
    # One-to-many relationship with Comment
    comments = relationship("Comment", back_populates="author")

class Comment(Base):
    __tablename__ = "comments"
    
    id = Column(Integer, primary_key=True)
    content = Column(Text, nullable=False)
    author_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    
    # Many-to-one relationship with User
    author = relationship("User", back_populates="comments")


class Launch(Base):
    __tablename__ = "launches"
    
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    description = Column(Text)
