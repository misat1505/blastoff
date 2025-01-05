from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.models import Site
from app.schemas import SiteCreate


async def create_site(db: AsyncSession, site_data: SiteCreate):
    db_site = Site(**site_data.model_dump())
    db.add(db_site)
    await db.commit()
    await db.refresh(db_site)
    return db_site


async def get_all_sites(db: AsyncSession):
    result = await db.execute(select(Site))
    sites = result.scalars().all()
    return sites


async def get_site_by_id(db: AsyncSession, site_id: int):
    result = await db.execute(select(Site).filter(Site.id == site_id))
    site = result.scalar_one_or_none()
    return site


async def delete_site(db: AsyncSession, site_id: int):
    site = await get_site_by_id(db, site_id)
    if not site:
        return None
    await db.delete(site)
    await db.commit()
    return site


async def update_site(
    db: AsyncSession, site_id: int, site_data: SiteCreate
):
    site = await get_site_by_id(db, site_id)
    if not site:
        return None

    site.name = site_data.name
    site.country = site_data.country
    site.latitude = site_data.latitude
    site.longitude = site_data.longitude
    site.description = site_data.description
    site.image_url = site_data.image_url
    site.map_image_url = site_data.map_image_url

    await db.commit()
    await db.refresh(site)
    return site
