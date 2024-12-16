from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas import SiteCreate, SiteResponse
from app.crud import create_site, get_all_sites, get_site_by_id, delete_site
from app.dependencies import get_db

router = APIRouter()


@router.post("/", response_model=SiteResponse)
async def create_site_route(site: SiteCreate, db: AsyncSession = Depends(get_db)):
    db_site = await create_site(db=db, site_data=site)
    return db_site


@router.get("/", response_model=list[SiteResponse])
async def get_sites(db: AsyncSession = Depends(get_db)):
    sites = await get_all_sites(db=db)
    return sites


@router.get("/{site_id}", response_model=SiteResponse)
async def get_site(site_id: str, db: AsyncSession = Depends(get_db)):
    site = await get_site_by_id(db=db, site_id=site_id)
    if not site:
        raise HTTPException(status_code=404, detail="Site not found")
    return site


@router.delete("/{site_id}", response_model=SiteResponse)
async def delete_site_route(site_id: str, db: AsyncSession = Depends(get_db)):
    deleted_site = await delete_site(db=db, site_id=site_id)
    if not deleted_site:
        raise HTTPException(status_code=404, detail="Site not found")
    return deleted_site
