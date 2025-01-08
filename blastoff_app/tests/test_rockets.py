import pytest
import httpx
from hypothesis import given, settings
from hypothesis.strategies import integers, floats, characters, text

URL_HOST = "http://localhost:8000/api/v1/rockets/"
TEST_ROCKET_ID = 333
TEST_AGENCY_ID = 121
allowed_characters = characters(blacklist_categories=["Cc", "Cs"])


@given(
    name=text(min_size=1, max_size=100, alphabet=allowed_characters),
    no_stages=integers(min_value=1, max_value=10),
    height=floats(
        min_value=0, max_value=100, allow_infinity=False, allow_nan=False
    ),
    mass=floats(
        min_value=0, max_value=100000, allow_infinity=False, allow_nan=False
    ),
    diameter=floats(
        min_value=0, max_value=10, allow_infinity=False, allow_nan=False
    ),
    description=text(min_size=1, max_size=5000, alphabet=allowed_characters),
    launches_count=integers(min_value=0, max_value=1000),
    successful_launches_count=integers(min_value=0, max_value=1000),
    failed_launches_count=integers(min_value=0, max_value=1000),
    landings_count=integers(min_value=0, max_value=1000),
    successful_landings_count=integers(min_value=0, max_value=1000),
    failed_landings_count=integers(min_value=0, max_value=1000),
    pending_launches=integers(min_value=0, max_value=1000),
    leo_capacity=floats(
        min_value=0, max_value=1000, allow_infinity=False, allow_nan=False
    ),
    gto_capacity=floats(
        min_value=0, max_value=1000, allow_infinity=False, allow_nan=False
    ),
    geo_capacity=floats(
        min_value=0, max_value=1000, allow_infinity=False, allow_nan=False
    ),
    sso_capacity=floats(
        min_value=0, max_value=1000, allow_infinity=False, allow_nan=False
    ),
    rocket_thrust=floats(
        min_value=0, max_value=10000, allow_infinity=False, allow_nan=False
    ),
    launch_cost=floats(
        min_value=0, max_value=1000000, allow_infinity=False, allow_nan=False
    ),
    image_url=text(min_size=1, max_size=500, alphabet=allowed_characters),
)
@settings(max_examples=10, deadline=None)
@pytest.mark.asyncio
async def test_create_and_delete_rocket(
    name,
    no_stages,
    height,
    mass,
    diameter,
    description,
    launches_count,
    successful_launches_count,
    failed_launches_count,
    landings_count,
    successful_landings_count,
    failed_landings_count,
    pending_launches,
    leo_capacity,
    gto_capacity,
    geo_capacity,
    sso_capacity,
    rocket_thrust,
    launch_cost,
    image_url,
):
    rocket_id = TEST_ROCKET_ID
    agency_id = TEST_AGENCY_ID
    rocket_data = {
        "id": rocket_id,
        "name": name,
        "no_stages": no_stages,
        "height": height,
        "mass": mass,
        "diameter": diameter,
        "description": description,
        "launches_count": launches_count,
        "successful_launches_count": successful_launches_count,
        "failed_launches_count": failed_launches_count,
        "landings_count": landings_count,
        "successful_landings_count": successful_landings_count,
        "failed_landings_count": failed_landings_count,
        "pending_launches": pending_launches,
        "leo_capacity": leo_capacity,
        "gto_capacity": gto_capacity,
        "geo_capacity": geo_capacity,
        "sso_capacity": sso_capacity,
        "rocket_thrust": rocket_thrust,
        "launch_cost": launch_cost,
        "image_url": image_url,
        "agency_id": agency_id,
    }

    async with httpx.AsyncClient() as client:
        create_response = await client.post(URL_HOST, json=rocket_data)
    assert create_response.status_code == 200
    created_rocket = create_response.json()

    for key, value in rocket_data.items():
        assert created_rocket[key] == value

    async with httpx.AsyncClient() as client:
        delete_response = await client.delete(URL_HOST + f"{rocket_id}")
    assert delete_response.status_code == 200
    deleted_rocket = delete_response.json()
    assert deleted_rocket["id"] == rocket_id
    assert deleted_rocket["name"] == rocket_data["name"]

    async with httpx.AsyncClient() as client:
        get_response = await client.get(URL_HOST + f"{rocket_id}")
    assert get_response.status_code == 404
    response_data = get_response.json()
    assert response_data["detail"] == "Rocket not found"


@pytest.mark.asyncio
async def test_create_rocket():
    new_rocket_data = {
        "id": TEST_ROCKET_ID,
        "name": "Test Rocket",
        "no_stages": 2,
        "height": 70.5,
        "mass": 600.0,
        "diameter": 5.2,
        "description": "This is a test rocket used for testing purposes.",
        "launches_count": 5,
        "successful_launches_count": 4,
        "failed_launches_count": 1,
        "landings_count": 3,
        "successful_landings_count": 2,
        "failed_landings_count": 1,
        "pending_launches": 1,
        "leo_capacity": 200.0,
        "gto_capacity": 100.0,
        "geo_capacity": 50.0,
        "sso_capacity": 40.0,
        "rocket_thrust": 1200.0,
        "launch_cost": 3000000.0,
        "image_url": "http://example.com/test_rocket.png",
        "agency_id": TEST_AGENCY_ID,
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(URL_HOST, json=new_rocket_data)
    assert response.status_code == 200
    created_rocket = response.json()

    for key, value in new_rocket_data.items():
        assert created_rocket[key] == value


@pytest.mark.asyncio
async def test_get_rocket():
    expected_rocket_data = {
        "id": TEST_ROCKET_ID,
        "name": "Test Rocket",
        "no_stages": 2,
        "height": 70.5,
        "mass": 600.0,
        "diameter": 5.2,
        "description": "This is a test rocket used for testing purposes.",
        "launches_count": 5,
        "successful_launches_count": 4,
        "failed_launches_count": 1,
        "landings_count": 3,
        "successful_landings_count": 2,
        "failed_landings_count": 1,
        "pending_launches": 1,
        "leo_capacity": 200.0,
        "gto_capacity": 100.0,
        "geo_capacity": 50.0,
        "sso_capacity": 40.0,
        "rocket_thrust": 1200.0,
        "launch_cost": 3000000.0,
        "image_url": "http://example.com/test_rocket.png",
        "agency_id": TEST_AGENCY_ID,
    }

    async with httpx.AsyncClient() as client:
        r = await client.get(URL_HOST + f"{TEST_ROCKET_ID}")
    assert r.status_code == 200
    response_data = r.json()
    for key, value in expected_rocket_data.items():
        assert response_data[key] == value


@pytest.mark.asyncio
async def test_delete_rocket():
    async with httpx.AsyncClient() as client:
        r = await client.delete(URL_HOST + f"{TEST_ROCKET_ID}")
    assert r.status_code == 200
    response_data = r.json()
    assert response_data["id"] == TEST_ROCKET_ID
    async with httpx.AsyncClient() as client:
        get_response = await client.get(URL_HOST + f"{TEST_ROCKET_ID}")
    assert get_response.status_code == 404
    response_data = get_response.json()
    assert response_data["detail"] == "Rocket not found"


@pytest.mark.asyncio
async def test_delete_wrong_id_rocket():
    wrong_id = TEST_ROCKET_ID + 1
    async with httpx.AsyncClient() as client:
        r = await client.delete(URL_HOST + f"{wrong_id}")
    assert r.status_code == 404
    response_data = r.json()
    assert response_data["detail"] == "Rocket not found"
