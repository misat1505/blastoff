import pytest
import httpx
from hypothesis import given, settings
from hypothesis.strategies import text, characters

URL_HOST = "http://localhost:8000/api/v1/users/"
allowed_characters = characters(blacklist_categories=["Cc", "Cs"])


@given(
    username=text(min_size=5, max_size=20, alphabet=allowed_characters),
    email=text(min_size=5, max_size=30, alphabet=allowed_characters),
    password=text(min_size=5, max_size=20, alphabet=allowed_characters),
)
@settings(max_examples=10, deadline=500)
@pytest.mark.asyncio
async def test_create_user(username, email, password):
    user_data = {"username": username, "email": email, "password": password}

    async with httpx.AsyncClient() as client:
        r = await client.post(URL_HOST + "register", json=user_data)
    assert r.status_code == 200
    response_data = r.json()
    test_user_id = response_data["id"]
    assert response_data["username"] == user_data["username"]
    assert response_data["email"] == user_data["email"]
    with pytest.raises(KeyError):
        _ = response_data["password"]

    async with httpx.AsyncClient() as client:
        r = await client.delete(URL_HOST + f"{test_user_id}")
    assert r.status_code == 200
    response_data = r.json()
    assert response_data["message"] == "User deleted successfully"

    async with httpx.AsyncClient() as client:
        r = await client.delete(URL_HOST + f"{test_user_id}")
    assert r.status_code == 404
    response_data = r.json()
    assert response_data["detail"] == "User not found"
