from datetime import datetime, timedelta, timezone

from jose import jwt, JWTError

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from backend.core.config import (
    SECRET_KEY,
    ALGORITHM,
    ACCESS_TOKEN_EXPIRE_MINUTES,
)

# Bearer Token Security
security = HTTPBearer()


# ============================
# Create JWT Access Token
# ============================

def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update(
        {
            "exp": expire
        }
    )

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM,
    )

    return encoded_jwt


# ============================
# Verify JWT Token
# ============================

def verify_token(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):

    token = credentials.credentials

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        return payload

    except JWTError:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )


# ============================
# Get Current User
# ============================

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):

    payload = verify_token(credentials)

    return {
        "id": payload.get("id"),
        "email": payload.get("sub"),
        "role": payload.get("role"),
    }


# ============================
# Admin Authorization
# ============================

def require_admin(
    current_user=Depends(get_current_user),
):

    if current_user["role"] != "admin":

        raise HTTPException(
            status_code=403,
            detail="Admin access required",
        )

    return current_user