from fastapi import APIRouter, Depends, HTTPException, Response, Request
from sqlalchemy.ext.asyncio import AsyncSession
from app.crud import (
    create_user,
    get_all_users,
    delete_user,
    update_user_email,
    get_user_by_id,
    get_user_by_email
)
from app.dependencies import get_db
from app.schemas import UserResponse, UserCreate, UserEmailUpdate, UserLogin
from app.security import verify_password
from app.authentication import create_access_token, decode_access_token
from app.models import User

router = APIRouter()


async def get_current_user(request: Request, db: AsyncSession = Depends(get_db)) -> User:
    """Extracts user from JWT token stored in cookies."""
    token = request.cookies.get("token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    try:
        payload = decode_access_token(token)
        user_id = payload.get("id")
    except HTTPException:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    if not user_id:
        raise HTTPException(status_code=401, detail="User not found in token")

    db_user = await db.get(User, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    return db_user


@router.post("/register", response_model=UserResponse)
async def register_user(user: UserCreate, response: Response, db: AsyncSession = Depends(get_db)):
    user_with_email = await get_user_by_email(db, user.email)
    if user_with_email:
        raise HTTPException(
            status_code=409,
            detail="User with this email already exists."
        )

    db_user = await create_user(db, user)
    token = create_access_token({"id": db_user.id})
    response.set_cookie(key="token", value=token, httponly=True)
    return db_user


@router.post("/login", response_model=UserResponse)
async def login_user(user: UserLogin, response: Response, db: AsyncSession = Depends(get_db)):
    db_user = await get_user_by_email(db, user.email)
    http_error = HTTPException(
        status_code=401,
        detail="Invalid email or password"
    )

    if not db_user:
        raise http_error

    if not verify_password(user.password, db_user.hashed_password):
        raise http_error

    token = create_access_token({"id": db_user.id})
    response.set_cookie(key="token", value=token, httponly=True)
    return db_user


@router.post("/logout")
async def logout_user(response: Response):
    response.delete_cookie(key="token")
    return {"message": "Successfully logged out"}


@router.get("/me", response_model=UserResponse)
async def get_user_data(current_user: User = Depends(get_current_user)):
    return current_user


@router.get("/all", response_model=list[UserResponse])
async def get_users(db: AsyncSession = Depends(get_db)):
    users = await get_all_users(db)
    if not users:
        raise HTTPException(status_code=404, detail="No users found")
    return users


@router.get("/{user_id}", response_model=UserResponse)
async def get_user_by_id_route(user_id: int, db: AsyncSession = Depends(get_db)):
    user = await get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.delete("/{user_id}", response_model=dict)
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
