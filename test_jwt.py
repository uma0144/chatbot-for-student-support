from backend.core.auth import create_access_token

token = create_access_token(
    {
        "sub": "student01",
        "role": "student"
    }
)

print(token)