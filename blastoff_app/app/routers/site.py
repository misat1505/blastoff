from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud import create_site, delete_site, get_all_sites, get_site_by_id
from app.dependencies import get_db
from app.schemas import SiteCreate, SiteResponse

router = APIRouter()


@router.post("/", response_model=SiteResponse)
async def create_site_route(
    site: SiteCreate, db: AsyncSession = Depends(get_db)
):
    """
    Endpoint to create a new site.

    - **site**: The data of the new site to be created.

    Returns the created site.
    """
    db_site = await create_site(db=db, site_data=site)
    return db_site


@router.get("/", response_model=list[SiteResponse])
async def get_sites(db: AsyncSession = Depends(get_db)):
    """
    Endpoint to retrieve a list of all sites.

    Returns a list of sites available in the system.
    """
    sites = await get_all_sites(db=db)
    return sites


@router.get("/{site_id}", response_model=SiteResponse)
async def get_site(site_id: int, db: AsyncSession = Depends(get_db)):
    """
    Endpoint to retrieve a site by its ID.

    - **site_id**: The ID of the site to retrieve.

    Returns the site if found, otherwise raises a 404 error.
    """
    site = await get_site_by_id(db=db, site_id=site_id)
    if not site:
        raise HTTPException(status_code=404, detail="Site not found")
    return site


@router.delete("/{site_id}", response_model=SiteResponse)
async def delete_site_route(site_id: int, db: AsyncSession = Depends(get_db)):
    """
    Endpoint to delete a site by its ID.

    - **site_id**: The ID of the site to delete.

    Returns the deleted site if successfully deleted, otherwise raises a 404 error.
    """
    deleted_site = await delete_site(db=db, site_id=site_id)
    if not deleted_site:
        raise HTTPException(status_code=404, detail="Site not found")
    return deleted_site
