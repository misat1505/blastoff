import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_create_user():
    user_data = {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "password123",
    }

    response = client.post("/users/", json=user_data)
    assert response.status_code == 200

    response_data = response.json()
    assert response_data["username"] == user_data["username"]
    assert response_data["email"] == user_data["email"]
    assert "id" in response_data
