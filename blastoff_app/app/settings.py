from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()


class Settings(BaseSettings):
    database_url: str
    jwt_secret: str
    frontend_url: str
    sentry_dsn: str
    redis_uri: str
    jwt_algorithm: str = "HS256"
    token_expiration_minutes: int = 300
    smtp_password: str


settings = Settings()
