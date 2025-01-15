from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.ext.asyncio import AsyncSession

from app.authentication import create_access_token, get_expires_timestamp
from app.crud import (
    create_user,
    delete_user,
    get_all_users,
    get_user_by_email,
    get_user_by_id,
    update_user_email,
)
from app.dependencies import get_current_user, get_db
from app.models import User
from app.schemas import UserCreate, UserEmailUpdate, UserLogin, UserResponse
from app.security import verify_password

router = APIRouter()


@router.post("/register", response_model=UserResponse)
async def register_user(
    user: UserCreate, response: Response, db: AsyncSession = Depends(get_db)
):
    """
    Endpoint to register a new user.

    - **user**: The user data for registration, including email and password.

    Returns the registered user and sets an authentication token as a cookie.
    """
    user_with_email = await get_user_by_email(db, user.email)
    if user_with_email:
        raise HTTPException(
            status_code=409, detail="User with this email already exists."
        )

    db_user = await create_user(db, user)
    token = create_access_token({"id": db_user.id})
    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        expires=get_expires_timestamp(),
    )
    return db_user


@router.post("/login", response_model=UserResponse)
async def login_user(
    user: UserLogin, response: Response, db: AsyncSession = Depends(get_db)
):
    """
    Endpoint for user login.

    - **user**: The email and password for the login.

    Returns the logged-in user with an authentication token in the response cookie.
    """
    db_user = await get_user_by_email(db, user.email)
    http_error = HTTPException(
        status_code=401, detail="Invalid email or password"
    )

    if not db_user:
        raise http_error

    if not verify_password(user.password, db_user.hashed_password):
        raise http_error

    token = create_access_token({"id": db_user.id})
    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        expires=get_expires_timestamp(),
    )
    return db_user


@router.post("/logout")
async def logout_user(response: Response):
    """
    Endpoint to log the user out by deleting the authentication cookie.

    Returns a message confirming the logout.
    """
    response.delete_cookie(key="token")
    return {"message": "Successfully logged out"}


@router.get("/me", response_model=UserResponse)
async def get_user_data(current_user: User = Depends(get_current_user)):
    """
    Endpoint to retrieve data of the current authenticated user.

    Returns the current user's data.
    """
    return current_user


@router.get("/all", response_model=list[UserResponse])
async def get_users(db: AsyncSession = Depends(get_db)):
    """
    Endpoint to get a list of all users in the system.

    Returns a list of all users.
    """
    users = await get_all_users(db)
    if not users:
        raise HTTPException(status_code=404, detail="No users found")
    return users


@router.get("/{user_id}", response_model=UserResponse)
async def get_user_by_id_route(
    user_id: int, db: AsyncSession = Depends(get_db)
):
    """
    Endpoint to retrieve a user by their ID.

    - **user_id**: The ID of the user to retrieve.

    Returns the user data if found, otherwise raises a 404 error.
    """
    user = await get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.delete("/{user_id}", response_model=dict)
async def delete_user_route(user_id: int, db: AsyncSession = Depends(get_db)):
    """
    Endpoint to delete a user by their ID.

    - **user_id**: The ID of the user to delete.

    Returns a success message if the user is deleted, otherwise raises a 404 error.
    """
    success = await delete_user(db, user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}


@router.put("/users/{user_id}/email", response_model=UserResponse)
async def update_user_email_route(
    user_id: int,
    email_update: UserEmailUpdate,
    db: AsyncSession = Depends(get_db),
):
    """
    Endpoint to update a user's email.

    - **user_id**: The ID of the user whose email needs to be updated.
    - **email_update**: The new email data.

    Returns the updated user data if successful, otherwise raises a 404 error.
    """
    user = await update_user_email(db, user_id, email_update.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
