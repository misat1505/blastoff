from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud import create_comment, delete_comment, get_all_comments, get_comment_by_id
from app.dependencies import get_db
from app.schemas import CommentCreate, CommentResponse

router = APIRouter()


@router.post("/", response_model=CommentResponse, status_code=201)
async def create_comment_route(
    comment: CommentCreate, db: AsyncSession = Depends(get_db)
):
    return await create_comment(db=db, comment_data=comment)


@router.get("/{comment_id}", response_model=CommentResponse)
async def get_comment(comment_id: int, db: AsyncSession = Depends(get_db)):
    comment = await get_comment_by_id(db=db, comment_id=comment_id)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    return comment


@router.get("/", response_model=List[CommentResponse])
async def get_comments(db: AsyncSession = Depends(get_db)):
    return await get_all_comments(db=db)


@router.delete("/{comment_id}", response_model=CommentResponse)
async def delete_comment_route(
    comment_id: int, db: AsyncSession = Depends(get_db)
):
    deleted_comment = await delete_comment(db=db, comment_id=comment_id)
    if not deleted_comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    return deleted_comment
