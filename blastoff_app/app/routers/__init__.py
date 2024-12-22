from fastapi import APIRouter

from .agency import router as agency_router
from .comment import router as comment_router
from .favourite_agency import router as favourite_agency_router
from .favourite_launch import router as favourite_launch_router
from .launch import router as launch_router
from .program import router as program_router
from .rocket import router as rocket_router
from .site import router as site_router
from .user import router as user_router

api_router = APIRouter()

api_router.include_router(user_router, prefix="/users", tags=["Users"])
api_router.include_router(
    comment_router, prefix="/comments", tags=["Comments"]
)
api_router.include_router(agency_router, prefix="/agencies", tags=["Agencies"])
api_router.include_router(
    favourite_agency_router,
    prefix="/favourite-agencies",
    tags=["FavouriteAgencies"],
)
api_router.include_router(rocket_router, prefix="/rockets", tags=["Rockets"])
api_router.include_router(launch_router, prefix="/launches", tags=["Launches"])
api_router.include_router(
    program_router, prefix="/programs", tags=["Programs"]
)
api_router.include_router(site_router, prefix="/sites", tags=["Sites"])
api_router.include_router(
    favourite_launch_router,
    prefix="/favourite-launches",
    tags=["FavouriteLaunches"],
)
