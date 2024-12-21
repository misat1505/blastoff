from datetime import datetime

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_create_user():
    unique_name = f"username_{datetime.now().timestamp()}"
    # Create a new user with a unique username
    response = client.post(
        "/users/register/",
        json={
            "username": unique_name,
            "email": f"{unique_name}@example.com",
            "password": "1234",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == unique_name
    assert data["email"] == f"{unique_name}@example.com"
    assert "id" in data


"""

def test_get_user():
    user_id = _test_create_user()  # Create user and get the user ID
    unique_name = f"username_{datetime.now().timestamp()}"
    # Retrieve the created user
    response = client.get(f"/users/{user_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == user_id
    assert data["username"] == unique_name  # Ensure the username is correct
    assert data["email"] == f"{unique_name}@example.com"  # Ensure the email is correct

def test_update_user_email():
    user_id = _test_create_user()  # Create user and get the user ID
    unique_name = f"username_{datetime.now().timestamp()}"
    new_email = f"newemail_{datetime.now().timestamp()}@example.com"
    # Update the user's email address
    response = client.put(
        f"/users/{user_id}",
        json={"email": new_email},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == user_id
    assert data["email"] == new_email

    # Verify the change by getting the updated user
    get_response = client.get(f"/users/{user_id}")
    assert get_response.status_code == 200
    updated_data = get_response.json()
    assert updated_data["email"] == new_email

def test_delete_user():
    user_id = _test_create_user()  # Create user and get the user ID
    # Delete the created user
    response = client.delete(f"/users/{user_id}")
    assert response.status_code == 200
    assert response.json() == {"message": "User deleted successfully"}

    # Try to retrieve the deleted user
    get_response = client.get(f"/users/{user_id}")
    assert get_response.status_code == 404  # User should be deleted, so return 404
"""
