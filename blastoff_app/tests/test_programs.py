import pytest
import httpx

URL_HOST = "http://localhost:8000/api/v1/programs/"
TEST_PROGRAM_ID = 0


@pytest.mark.asyncio
async def test_create_program():
    program_data = {
        "name": "Test Program",
        "description": "Test description",
        "website": "https://www.testwebsite.com",
        "image_url": "https://www.testwebsite.com/image.png",
        "id": TEST_PROGRAM_ID,
    }
    async with httpx.AsyncClient() as client:
        r = await client.post(URL_HOST, json=program_data)
    assert r.status_code == 201
    response_data = r.json()
    assert response_data["name"] == program_data["name"]
    assert response_data["description"] == program_data["description"]
    assert response_data["website"] == program_data["website"]
    assert response_data["image_url"] == program_data["image_url"]
    assert response_data["id"] == program_data["id"]


@pytest.mark.asyncio
async def test_delete_program():
    async with httpx.AsyncClient() as client:
        r = await client.delete(URL_HOST + f"{TEST_PROGRAM_ID}")
    assert r.status_code == 200


@pytest.mark.asyncio
async def test_delete_non_existent_program():
    async with httpx.AsyncClient() as client:
        r = await client.delete(URL_HOST + f"{TEST_PROGRAM_ID}")
    assert r.status_code == 404
    response_data = r.json()
    assert response_data["detail"] == "Program not found"
