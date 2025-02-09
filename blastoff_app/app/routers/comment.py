from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud import (
    create_comment,
    delete_comment,
    get_comment_by_id,
    get_comments_by_launch_id_and_parent,
)
from app.dependencies import get_current_user, get_db
from app.models import User
from app.schemas import CommentCreate, CommentCreateBody, CommentResponse

router = APIRouter()


@router.post("/", response_model=CommentResponse, status_code=201)
async def create_comment_route(
    comment: CommentCreateBody,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    """
    Endpoint to create a new comment for a launch.

    - **comment**: The comment data to be created.
    - **user**: The current authenticated user creating the comment.

    Returns the created comment in the response.
    """
    newComment = CommentCreate(**comment.model_dump(), user_id=user.id)
    return await create_comment(db=db, comment_data=newComment)


@router.get("/{comment_id}", response_model=CommentResponse)
async def get_comment(comment_id: int, db: AsyncSession = Depends(get_db)):
    """
    Endpoint to retrieve a specific comment by its ID.

    - **comment_id**: The ID of the comment to retrieve.

    Returns the requested comment if found.
    """
    comment = await get_comment_by_id(db=db, comment_id=comment_id)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    return comment


@router.get("/", response_model=List[CommentResponse])
async def get_comments(
    launch_id: str,
    parent_comment_id: Optional[int] = Query(
        None,
        description="Parent comment ID to filter replies. None for top-level comments.",
    ),
    db: AsyncSession = Depends(get_db),
):
    """
    Endpoint to retrieve all comments for a specific launch, optionally filtering by parent comment ID.

    - **launch_id**: The ID of the launch for which comments are being retrieved.
    - **parent_comment_id**: The parent comment ID to filter replies. If not provided, top-level comments are returned.

    Returns a list of comments matching the provided filters.
    """
    comments = await get_comments_by_launch_id_and_parent(
        db=db, launch_id=launch_id, parent_comment_id=parent_comment_id
    )
    return comments


@router.delete("/{comment_id}", response_model=CommentResponse)
async def delete_comment_route(
    comment_id: int, db: AsyncSession = Depends(get_db)
):
    """
    Endpoint to delete a comment by its ID.

    - **comment_id**: The ID of the comment to delete.

    Returns the deleted comment if found.
    """
    deleted_comment = await delete_comment(db=db, comment_id=comment_id)
    if not deleted_comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    return deleted_comment
