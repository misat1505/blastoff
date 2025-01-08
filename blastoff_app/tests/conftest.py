import httpx
import pytest_asyncio

URL_HOST_A = "http://localhost:8000/api/v1/agencies/"
DELETE_AGENCY_ID = 501
CREATE_AGENCY_ID = 121

URL_HOST_R = "http://localhost:8000/api/v1/rockets/"
DELETE_ROCKET_ID = 333
CREATE_ROCKET_ID = 8454

URL_HOST_L = "http://localhost:8000/api/v1/launches/"
DELETE_LAUNCH_ID = "testlaunchid4"

URL_HOST_P = "http://localhost:8000/api/v1/programs/"
CREATE_PROGRAM_ID = 25
DELETE_PROGRAM_ID = 0

URL_HOST_S = "http://localhost:8000/api/v1/sites/"
CREATE_SITE_ID = 87
DELETE_SITE_ID = 0


@pytest_asyncio.fixture(scope="session", autouse=True)
async def prepare_database():
    await setup_test_data()


async def setup_test_data():
    async with httpx.AsyncClient() as client:
        await client.delete(URL_HOST_R + f"{DELETE_ROCKET_ID}")

    agency_data = {
        "id": CREATE_AGENCY_ID,
        "name": "SpaceX",
        "country": "USA",
        "description": "Private space exploration company.",
        "website": "https://www.spacex.com",
        "image_url": "https://www.spacex.com/logo.png",
    }
    async with httpx.AsyncClient() as client:
        await client.post(URL_HOST_A, json=agency_data)
    async with httpx.AsyncClient() as client:
        await client.delete(URL_HOST_A + f"{DELETE_AGENCY_ID}")

    new_rocket_data = {
        "id": CREATE_ROCKET_ID,
        "name": "Falcon Nova",
        "no_stages": 3,
        "height": 80.2,
        "mass": 750.0,
        "diameter": 6.1,
        "description": "A state-of-the-art rocket designed for interplanetary missions.",
        "launches_count": 10,
        "successful_launches_count": 9,
        "failed_launches_count": 1,
        "landings_count": 7,
        "successful_landings_count": 6,
        "failed_landings_count": 1,
        "pending_launches": 3,
        "leo_capacity": 250.0,
        "gto_capacity": 120.0,
        "geo_capacity": 60.0,
        "sso_capacity": 45.0,
        "rocket_thrust": 1500.0,
        "launch_cost": 5000000.0,
        "image_url": "http://example.com/falcon_nova.png",
        "agency_id": CREATE_AGENCY_ID,
    }

    async with httpx.AsyncClient() as client:
        await client.post(URL_HOST_R, json=new_rocket_data)

    program_data = {
        "name": "Mars Exploration Program",
        "description": "A program dedicated to exploring Mars.",
        "website": "string",
        "image_url": "string",
        "id": CREATE_PROGRAM_ID
    }
    async with httpx.AsyncClient() as client:
        await client.post(URL_HOST_P, json=program_data)
    async with httpx.AsyncClient() as client:
        await client.delete(URL_HOST_P + f"{DELETE_PROGRAM_ID}")

    site_data = {
        "name": "Cape Canaveral",
        "country": "string",
        "latitude": 0,
        "longitude": 0,
        "description": "string",
        "image_url": "string",
        "map_image_url": "string",
        "id": CREATE_SITE_ID
    }
    async with httpx.AsyncClient() as client:
        await client.post(URL_HOST_S, json=site_data)
    async with httpx.AsyncClient() as client:
        await client.delete(URL_HOST_S + f"{DELETE_SITE_ID}")

    async with httpx.AsyncClient() as client:
        await client.delete(URL_HOST_L + f"{DELETE_LAUNCH_ID}")
