from app.models import Comment
from app.schemas import CommentCreate, CommentResponse
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select


async def create_comment(
        db: AsyncSession, comment_data: CommentCreate
) -> CommentResponse:
    db_comment = Comment(
        text=comment_data.text,
        user_id=comment_data.user_id,
        launch_id=comment_data.launch_id,
        parent_comment_id=comment_data.parent_comment_id,
    )
    db.add(db_comment)
    await db.commit()
    await db.refresh(db_comment)
    return db_comment


async def get_comment_by_id(db: AsyncSession, comment_id: int) -> CommentResponse:
    result = await db.execute(select(Comment).filter(Comment.id == comment_id))
    comment = result.scalar_one_or_none()
    if comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    return comment


async def get_all_comments(db: AsyncSession) -> list[CommentResponse]:
    result = await db.execute(select(Comment))
    comments = result.scalars().all()
    return comments


async def delete_comment(db: AsyncSession, comment_id: int):
    comment = await get_comment_by_id(db, comment_id)
    if not comment:
        return None
    await db.delete(comment)
    await db.commit()
    return comment
