import pytest
import httpx
from hypothesis import given, settings
from hypothesis.strategies import characters, text

URL_HOST = "http://localhost:8000/api/v1/agencies/"
TEST_AGENCY_ID = 501
allowed_characters = characters(blacklist_categories=["Cc", "Cs"])


@given(
    name=text(min_size=1, max_size=50, alphabet=allowed_characters),
    country=text(min_size=1, max_size=50, alphabet=allowed_characters),
    description=text(min_size=1, max_size=100, alphabet=allowed_characters),
    website=text(min_size=1, max_size=100, alphabet=allowed_characters),
    image_url=text(min_size=1, max_size=100, alphabet=allowed_characters),
)
@settings(max_examples=10, deadline=None)
@pytest.mark.asyncio
async def test_create_and_delete_agency(
    name, country, description, website, image_url
):
    agency_id = TEST_AGENCY_ID
    agency_data = {
        "id": agency_id,
        "name": name,
        "country": country,
        "description": description,
        "website": website,
        "image_url": image_url,
    }

    async with httpx.AsyncClient() as client:
        create_response = await client.post(URL_HOST, json=agency_data)
    assert create_response.status_code == 200
    created_agency = create_response.json()
    assert created_agency["id"] == agency_data["id"]
    assert created_agency["name"] == agency_data["name"]
    assert created_agency["country"] == agency_data["country"]
    assert created_agency["description"] == agency_data["description"]
    assert created_agency["website"] == agency_data["website"]
    assert created_agency["image_url"] == agency_data["image_url"]

    async with httpx.AsyncClient() as client:
        delete_response = await client.delete(URL_HOST + f"{agency_id}")
    assert delete_response.status_code == 200
    deleted_agency = delete_response.json()
    assert deleted_agency["id"] == agency_id
    assert deleted_agency["name"] == agency_data["name"]

    async with httpx.AsyncClient() as client:
        get_response = await client.get(URL_HOST + f"{agency_id}")
    assert get_response.status_code == 404
    response_data = get_response.json()
    assert response_data["detail"] == "Agency not found"


@pytest.mark.asyncio
async def test_create_agency():
    agency_data = {
        "id": TEST_AGENCY_ID,
        "name": "SpaceX",
        "country": "USA",
        "description": "Private space exploration company.",
        "website": "https://www.spacex.com",
        "image_url": "https://www.spacex.com/logo.png",
    }
    async with httpx.AsyncClient() as client:
        r = await client.post(URL_HOST, json=agency_data)
    assert r.status_code == 200
    response_data = r.json()
    assert response_data["id"] == agency_data["id"]
    assert response_data["name"] == agency_data["name"]
    assert response_data["country"] == agency_data["country"]
    assert response_data["description"] == agency_data["description"]
    assert response_data["website"] == agency_data["website"]
    assert response_data["image_url"] == agency_data["image_url"]


@pytest.mark.asyncio
async def test_update_agency():
    updated_agency_data = {
        "name": "string",
        "country": "string",
        "description": "string",
        "website": "string",
        "image_url": "string",
        "id": 501,
    }
    async with httpx.AsyncClient() as client:
        r = await client.put(
            URL_HOST + f"{TEST_AGENCY_ID}", json=updated_agency_data
        )
    assert r.status_code == 200
    response_data = r.json()
    assert response_data["id"] == updated_agency_data["id"]
    assert response_data["name"] == updated_agency_data["name"]
    assert response_data["country"] == updated_agency_data["country"]
    assert response_data["description"] == updated_agency_data["description"]
    assert response_data["website"] == updated_agency_data["website"]
    assert response_data["image_url"] == updated_agency_data["image_url"]


@pytest.mark.asyncio
async def test_get_agency():
    updated_agency_data = {
        "name": "string",
        "country": "string",
        "description": "string",
        "website": "string",
        "image_url": "string",
        "id": 501,
    }
    async with httpx.AsyncClient() as client:
        r = await client.get(URL_HOST + f"{TEST_AGENCY_ID}")
    assert r.status_code == 200
    response_data = r.json()
    assert response_data["id"] == updated_agency_data["id"]
    assert response_data["name"] == updated_agency_data["name"]
    assert response_data["country"] == updated_agency_data["country"]
    assert response_data["description"] == updated_agency_data["description"]
    assert response_data["website"] == updated_agency_data["website"]
    assert response_data["image_url"] == updated_agency_data["image_url"]


@pytest.mark.asyncio
async def test_delete_agency():
    updated_agency_data = {
        "name": "string",
        "country": "string",
        "description": "string",
        "website": "string",
        "image_url": "string",
        "id": 501,
    }
    async with httpx.AsyncClient() as client:
        r = await client.delete(URL_HOST + f"{TEST_AGENCY_ID}")
    assert r.status_code == 200
    response_data = r.json()
    assert response_data["id"] == updated_agency_data["id"]
    assert response_data["name"] == updated_agency_data["name"]
    assert response_data["country"] == updated_agency_data["country"]
    assert response_data["description"] == updated_agency_data["description"]
    assert response_data["website"] == updated_agency_data["website"]
    assert response_data["image_url"] == updated_agency_data["image_url"]


@pytest.mark.asyncio
async def test_delete_wrong_id_agency():
    async with httpx.AsyncClient() as client:
        r = await client.delete(URL_HOST + f"{TEST_AGENCY_ID+1}")
    assert r.status_code == 404
    response_data = r.json()
    assert response_data["detail"] == "Agency not found"
