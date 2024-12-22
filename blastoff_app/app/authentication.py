from datetime import datetime, timedelta, timezone

import jwt
from fastapi import HTTPException

from app.settings import settings


def get_expires_timestamp() -> datetime:
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.token_expiration_minutes
    )
    return expire


def create_access_token(data: dict) -> str:
    """Create a JWT token with a payload."""
    to_encode = data.copy()
    to_encode.update({"exp": get_expires_timestamp()})
    encoded_jwt = jwt.encode(
        to_encode, settings.jwt_secret, algorithm=settings.jwt_algorithm
    )
    return encoded_jwt


def decode_access_token(token: str) -> dict:
    """Decode and validate the JWT token."""
    try:
        payload = jwt.decode(
            token, settings.jwt_secret, algorithms=[settings.jwt_algorithm]
        )
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
