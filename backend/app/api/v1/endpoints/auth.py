"""Authentication endpoints."""

from fastapi import APIRouter, Depends, HTTPException, status
from datetime import timedelta
from bson import ObjectId
from app.db.database import get_db
from app.schemas.user import LoginRequest, RegisterRequest, TokenResponse
from app.core.security import hash_password, verify_password, create_access_token
from app.core.exceptions import AuthenticationException, ConflictException
from app.config import settings
from datetime import datetime

router = APIRouter()


@router.post("/register", response_model=TokenResponse)
async def register(request: RegisterRequest, db = Depends(get_db)):
    """Register a new user."""
    
    # Check if user already exists
    existing_user = await db["users"].find_one({"email": request.email})
    if existing_user:
        raise ConflictException("Email already registered")
    
    # Create user
    user_data = {
        "email": request.email,
        "full_name": request.full_name,
        "hashed_password": hash_password(request.password),
        "role": request.role,
        "is_active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }
    
    result = await db["users"].insert_one(user_data)
    user_id = str(result.inserted_id)
    
    # Generate token
    access_token = create_access_token(
        subject=user_id,
        additional_claims={"role": request.role}
    )
    
    return TokenResponse(
        access_token=access_token,
        expires_in=settings.JWT_EXPIRATION_HOURS * 3600
    )


@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest, db = Depends(get_db)):
    """Login user."""
    
    # Find user by email
    user = await db["users"].find_one({"email": request.email})
    if not user:
        raise AuthenticationException("Invalid email or password")
    
    # Verify password
    if not verify_password(request.password, user["hashed_password"]):
        raise AuthenticationException("Invalid email or password")
    
    if not user.get("is_active", True):
        raise AuthenticationException("User account is disabled")
    
    # Generate token
    access_token = create_access_token(
        subject=str(user["_id"]),
        additional_claims={"role": user.get("role", "player")}
    )
    
    return TokenResponse(
        access_token=access_token,
        expires_in=settings.JWT_EXPIRATION_HOURS * 3600
    )


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(db = Depends(get_db)):
    """Refresh access token."""
    # This would need the current token to extract user info
    pass
