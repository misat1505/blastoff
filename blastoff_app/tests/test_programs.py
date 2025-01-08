import pytest
import httpx

URL_HOST = "http://localhost:8000/api/v1/programs/"
TEST_PROGRAM_ID = 0


@pytest.mark.asyncio
async def test_create_program():
    program_data = {
        "id": TEST_PROGRAM_ID,
        "name": "Test Program",
        "description": "Test description",
        "website": "https://www.testwebsite.com",
        "image_url": "https://www.testwebsite.com/image.png",
    }
    async with httpx.AsyncClient() as client:
        r = await client.post(URL_HOST, json=program_data)
    assert r.status_code == 201
    response_data = r.json()

    for key in program_data.keys():
        assert response_data[key] == program_data[key]


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
