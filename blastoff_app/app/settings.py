from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()


class Settings(BaseSettings):
    database_url: str
    jwt_secret: str
    frontend_url: str
    sentry_dsn: str


settings = Settings()
