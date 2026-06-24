"""API dependencies."""

from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthCredentials
from bson import ObjectId
from app.core.security import decode_token
from app.core.exceptions import AuthenticationException
from app.db.database import get_db

security = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthCredentials = Depends(security),
    db = Depends(get_db)
):
    """Get current authenticated user."""
    token = credentials.credentials
    payload = decode_token(token)
    user_id = payload.get("sub")
    
    user = await db["users"].find_one({"_id": ObjectId(user_id)})
    if not user:
        raise AuthenticationException("User not found")
    
    return user


async def get_current_arbiter(
    current_user = Depends(get_current_user),
    db = Depends(get_db)
):
    """Get current user and verify they are an arbiter."""
    if current_user.get("role") not in ["arbiter", "admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only arbiters can perform this action"
        )
    return current_user
