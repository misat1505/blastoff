from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.crud import (
    create_user,
    get_all_users,
    delete_user,
    update_user_email,
    get_user_by_id,
)
from app.dependencies import get_db
from app.schemas import UserResponse, UserCreate, UserEmailUpdate

router = APIRouter()


@router.post("/register", response_model=UserResponse)
async def register_user(user: UserCreate, db: AsyncSession = Depends(get_db)):
    db_user = await create_user(db, user)
    return db_user


@router.get("/all", response_model=list[UserResponse])
async def get_users(db: AsyncSession = Depends(get_db)):
    users = await get_all_users(db)
    if not users:
        raise HTTPException(status_code=404, detail="No users found")
    return users


@router.get("/users/{user_id}", response_model=UserResponse)
async def get_user_by_id_route(user_id: int, db: AsyncSession = Depends(get_db)):
    user = await get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.delete("/delete/{user_id}", response_model=dict)
async def delete_user_route(user_id: int, db: AsyncSession = Depends(get_db)):
    success = await delete_user(db, user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}


@router.put("/users/{user_id}/email", response_model=UserResponse)
async def update_user_email_route(
    user_id: int, email_update: UserEmailUpdate, db: AsyncSession = Depends(get_db)
):
    user = await update_user_email(db, user_id, email_update.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
