from datetime import datetime, timedelta, timezone

import jwt
from fastapi import HTTPException

from app.settings import settings


def get_expires_timestamp() -> datetime:
    """
    Get the expiration timestamp for the JWT token.

    This function calculates the expiration time for a JWT token based on the
    configured expiration duration in the settings. It adds the expiration
    duration (in minutes) to the current time.

    Returns:
        datetime: The timestamp when the token expires.
    """
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.token_expiration_minutes
    )
    return expire


def create_access_token(data: dict) -> str:
    """
    Create a JWT token with a payload.

    This function generates a JWT token by encoding the provided data with the
    secret key and specified algorithm. It also includes the expiration time
    in the payload.

    Args:
        data (dict): The payload data to encode into the token.

    Returns:
        str: The encoded JWT token.
    """
    to_encode = data.copy()
    to_encode.update({"exp": get_expires_timestamp()})
    encoded_jwt = jwt.encode(
        to_encode, settings.jwt_secret, algorithm=settings.jwt_algorithm
    )
    return encoded_jwt


def decode_access_token(token: str) -> dict:
    """
    Decode and validate the JWT token.

    This function decodes the JWT token using the secret key and algorithm
    specified in the settings. It also checks the validity of the token and
    raises an HTTPException if the token is expired or invalid.

    Args:
        token (str): The JWT token to decode.

    Returns:
        dict: The decoded payload of the token.

    Raises:
        HTTPException: If the token is expired or invalid, a 401 error is raised.
    """
    try:
        payload = jwt.decode(
            token, settings.jwt_secret, algorithms=[settings.jwt_algorithm]
        )
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
