from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr, field_validator
from sqlalchemy.orm import Session

from backend.database.database import get_db
from backend.core.security import verify_password, hash_password
from backend.core.auth import create_access_token
from backend.database import crud

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)

# ==========================================
# Register Models
# ==========================================

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str

    @field_validator("name")
    @classmethod
    def validate_name(cls, value):
        if not value.strip():
            raise ValueError("Name cannot be empty")
        return value.strip()

    @field_validator("password")
    @classmethod
    def validate_password(cls, value):
        if len(value) < 6:
            raise ValueError("Password must be at least 6 characters")
        return value


class RegisterResponse(BaseModel):
    id: int
    name: str
    email: str


# ==========================================
# Login Models
# ==========================================

class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# ==========================================
# Register API
# ==========================================

@router.post(
    "/register",
    response_model=RegisterResponse,
    status_code=201,
)
def register(
    payload: RegisterRequest,
    db: Session = Depends(get_db),
):

    existing_user = crud.get_user_by_email(
        db,
        payload.email,
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered.",
        )

    # ---------------------------------------
    # Hash Password
    # ---------------------------------------

    hashed_password = hash_password(payload.password)

    # ---------------------------------------
    # Create User
    # ---------------------------------------

    new_user = crud.create_user(
        db=db,
        name=payload.name,
        email=payload.email,
        password=hashed_password,
    )

    return RegisterResponse(
        id=new_user.id,
        name=new_user.name,
        email=new_user.email,
    )


# ==========================================
# Login API
# ==========================================

@router.post("/login")
def login(
    payload: LoginRequest,
    db: Session = Depends(get_db),
):

    user = crud.get_user_by_email(
        db,
        payload.email,
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    if not verify_password(
        payload.password,
        user.password,
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    token = create_access_token(
        {
            "id": user.id,
            "sub": user.email,
            "role": user.role,
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
    }