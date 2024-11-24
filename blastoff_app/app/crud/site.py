from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.exc import NoResultFound
from app.models import Site
from app.schemas import SiteCreate


async def create_site(db: AsyncSession, site_data: SiteCreate):
    db_site = Site(
        name=site_data.name,
        location=site_data.location,
        description=site_data.description,
    )
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
