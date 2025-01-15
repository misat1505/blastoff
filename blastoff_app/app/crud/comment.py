from typing import Optional

from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import joinedload

from app.models import Comment
from app.schemas import CommentCreate, CommentResponse


async def create_comment(
    db: AsyncSession, comment_data: CommentCreate
) -> CommentResponse:
    """
    Create a new comment and return the created comment with its user details.

    Args:
        db (AsyncSession): Database session object.
        comment_data (CommentCreate): Data required to create a comment.

    Returns:
        CommentResponse: The created comment object, including user details.
    """
    db_comment = Comment(**comment_data.model_dump())
    db.add(db_comment)
    await db.commit()
    await db.refresh(db_comment)

    query = (
        select(Comment)
        .options(joinedload(Comment.user))
        .where(Comment.id == db_comment.id)
    )
    result = await db.execute(query)
    comment_with_user = result.scalars().first()

    return CommentResponse.from_orm(comment_with_user)


async def get_comment_by_id(
    db: AsyncSession, comment_id: int
) -> CommentResponse:
    """
    Retrieve a comment by its ID.

    Args:
        db (AsyncSession): Database session object.
        comment_id (int): The ID of the comment to retrieve.

    Returns:
        CommentResponse: The comment object if found.

    Raises:
        HTTPException: If the comment is not found (404 status code).
    """
    result = await db.execute(select(Comment).filter(Comment.id == comment_id))
    comment = result.scalar_one_or_none()
    if comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    return comment


async def get_all_comments(db: AsyncSession) -> list[CommentResponse]:
    """
    Retrieve all comments from the database.

    Args:
        db (AsyncSession): Database session object.

    Returns:
        list[CommentResponse]: A list of all comments.
    """
    result = await db.execute(select(Comment))
    comments = result.scalars().all()
    return comments


async def delete_comment(db: AsyncSession, comment_id: int):
    """
    Delete a comment by its ID.

    Args:
        db (AsyncSession): Database session object.
        comment_id (int): The ID of the comment to delete.

    Returns:
        CommentResponse: The deleted comment object if found, otherwise None.
    """
    comment = await get_comment_by_id(db, comment_id)
    if not comment:
        return None
    await db.delete(comment)
    await db.commit()
    return comment


async def get_comments_by_launch_id_and_parent(
    db: AsyncSession, launch_id: str, parent_comment_id: Optional[int] = None
):
    """
    Retrieve comments associated with a specific launch ID and parent comment.

    Args:
        db (AsyncSession): Database session object.
        launch_id (str): The ID of the launch associated with the comments.
        parent_comment_id (Optional[int]): The ID of the parent comment, if any. Defaults to None.

    Returns:
        list[Comment]: A list of comments matching the criteria.
    """
    query = (
        select(Comment)
        .where(Comment.launch_id == launch_id)
        .where(Comment.parent_comment_id == parent_comment_id)
        .options(joinedload(Comment.user))
    )
    result = await db.execute(query)
    return result.unique().scalars().all()
