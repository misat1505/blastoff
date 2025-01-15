"""
This module contains all the API route handlers for the application.

For detailed documentation on each route, refer to the respective markdown files.

Available routers:
- `users`: Routes related to user registration, login, and profile management.
- `comments`: Routes for posting and retrieving comments on launches or agencies.
- `agencies`: Routes for managing agencies and their information.
- `favourite-agencies`: Routes for handling user favorite agencies.
- `rockets`: Routes for managing rocket information and related launches.
- `launches`: Routes for managing rocket launches and their details.
- `programs`: Routes for managing space programs and associated launches.
- `sites`: Routes for managing launch sites used for rocket launches.
- `favourite-launches`: Routes for handling user favorite launches.

Each router is included under a specific prefix and grouped by its functionality to create a modular and organized API structure.

The following routes are included:
- **Users**: `/users`
- **Comments**: `/comments`
- **Agencies**: `/agencies`
- **Favourite Agencies**: `/favourite-agencies`
- **Rockets**: `/rockets`
- **Launches**: `/launches`
- **Programs**: `/programs`
- **Sites**: `/sites`
- **Favourite Launches**: `/favourite-launches`
"""

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
