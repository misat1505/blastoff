import pytest
import httpx
from hypothesis import given, settings
from hypothesis.strategies import text, floats, characters

URL_HOST = "http://localhost:8000/api/v1/sites/"
TEST_SITE_ID = 0
allowed_characters = characters(blacklist_categories=["Cc", "Cs"])


@given(
    name=text(min_size=5, max_size=30, alphabet=allowed_characters),
    country=text(min_size=5, max_size=20, alphabet=allowed_characters),
    latitude=floats(min_value=-90, max_value=90),
    longitude=floats(min_value=-180, max_value=180),
    description=text(min_size=5, max_size=100, alphabet=allowed_characters),
    image_url=text(min_size=5, max_size=100, alphabet=allowed_characters),
    map_image_url=text(min_size=5, max_size=100, alphabet=allowed_characters),
)
@settings(max_examples=10, deadline=None)
@pytest.mark.asyncio
async def test_create_site(
    name, country, latitude, longitude, description, image_url, map_image_url
):
    site_data = {
        "name": name,
        "country": country,
        "latitude": latitude,
        "longitude": longitude,
        "description": description,
        "image_url": image_url,
        "map_image_url": map_image_url,
        "id": TEST_SITE_ID,
    }

    async with httpx.AsyncClient() as client:
        r = await client.post(URL_HOST, json=site_data)
    assert r.status_code == 200
    response_data = r.json()
    assert response_data["name"] == site_data["name"]
    assert response_data["country"] == site_data["country"]
    assert response_data["latitude"] == site_data["latitude"]
    assert response_data["longitude"] == site_data["longitude"]
    assert response_data["description"] == site_data["description"]
    assert response_data["image_url"] == site_data["image_url"]
    assert response_data["map_image_url"] == site_data["map_image_url"]

    async with httpx.AsyncClient() as client:
        r = await client.delete(URL_HOST + f"{TEST_SITE_ID}")
    assert r.status_code == 200

    async with httpx.AsyncClient() as client:
        r = await client.delete(URL_HOST + f"{TEST_SITE_ID}")
    assert r.status_code == 404
    response_data = r.json()
    assert response_data["detail"] == "Site not found"
