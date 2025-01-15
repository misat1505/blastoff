from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password: str) -> str:
    """
    Hashes the given password using bcrypt.

    Args:
        password (str): The plain text password to hash.

    Returns:
        str: The bcrypt hashed password.
    """
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifies if the plain password matches the hashed password.

    Args:
        plain_password (str): The plain text password to verify.
        hashed_password (str): The bcrypt hashed password to compare with.

    Returns:
        bool: True if the plain password matches the hashed password, otherwise False.
    """
    return pwd_context.verify(plain_password, hashed_password)
