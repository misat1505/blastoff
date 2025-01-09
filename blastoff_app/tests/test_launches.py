import httpx
import pytest

URL_HOST = "http://localhost:8000/api/v1/launches/"
TEST_LAUNCH_ID = "testlaunchid4"
TEST_ROCKET_ID = 8454
TEST_PROGRAM_ID = 25
TEST_SITE_ID = 87


@pytest.mark.asyncio
async def test_create_launch():
    new_launch_data = {
        "id": TEST_LAUNCH_ID,
        "last_updated": "2025-01-07T21:11:02.671000Z",
        "mission_name": "Test Mission",
        "status_name": "Scheduled",
        "status_description": "The launch is scheduled and awaiting execution.",
        "date": "2025-01-07T21:11:02.671000Z",
        "description": "This is a test launch for testing purposes.",
        "url": "http://example.com/test_launch",
        "image_url": "http://example.com/test_launch_image.png",
        "rocket_id": TEST_ROCKET_ID,
        "program_id": TEST_PROGRAM_ID,
        "site_id": TEST_SITE_ID,
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(URL_HOST, json=new_launch_data)
    assert response.status_code == 201
    created_launch = response.json()

    for key, value in new_launch_data.items():
        assert created_launch[key] == value


@pytest.mark.asyncio
async def test_get_launch():
    expected_launch_data = {
        "id": TEST_LAUNCH_ID,
        "last_updated": "2025-01-07T21:11:02.671000Z",
        "mission_name": "Test Mission",
        "status_name": "Scheduled",
        "status_description": "The launch is scheduled and awaiting execution.",
        "date": "2025-01-07T21:11:02.671000Z",
        "description": "This is a test launch for testing purposes.",
        "url": "http://example.com/test_launch",
        "image_url": "http://example.com/test_launch_image.png",
        "rocket_id": TEST_ROCKET_ID,
        "program_id": TEST_PROGRAM_ID,
        "site_id": TEST_SITE_ID,
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(URL_HOST + f"{TEST_LAUNCH_ID}")
    assert response.status_code == 200
    response_data = response.json()

    for key, value in expected_launch_data.items():
        assert response_data[key] == value


@pytest.mark.asyncio
async def test_delete_launch():
    async with httpx.AsyncClient() as client:
        response = await client.delete(URL_HOST + f"{TEST_LAUNCH_ID}")
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["id"] == TEST_LAUNCH_ID

    async with httpx.AsyncClient() as client:
        get_response = await client.get(URL_HOST + f"{TEST_LAUNCH_ID}")
    assert get_response.status_code == 404
    response_data = get_response.json()
    assert response_data["detail"] == "Launch not found"


@pytest.mark.asyncio
async def test_delete_wrong_id_launch():
    async with httpx.AsyncClient() as client:
        response = await client.delete(URL_HOST + f"{TEST_LAUNCH_ID}")
    assert response.status_code == 404
    response_data = response.json()
    assert response_data["detail"] == "Launch not found"
