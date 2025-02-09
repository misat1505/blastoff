from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.settings import settings


def setup_cors(app: FastAPI):
    """
    Configure CORS for the FastAPI application.

    Attributes:
        app (FastAPI): The FastAPI application instance to configure.
    """
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[settings.frontend_url],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
