"""User model."""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from app.core.constants import UserRole


class UserBase(BaseModel):
    """Base user schema."""
    email: EmailStr
    full_name: str
    role: UserRole = UserRole.PLAYER


class UserCreate(UserBase):
    """User creation schema."""
    password: str


class User(UserBase):
    """User model."""
    id: str = Field(alias="_id")
    hashed_password: str
    is_active: bool = True
    created_at: datetime
    updated_at: datetime
    
    class Config:
        """Pydantic config."""
        populate_by_name = True


class UserInDB(User):
    """User in database."""
    pass


class UserResponse(UserBase):
    """User response schema."""
    id: str = Field(alias="_id")
    is_active: bool
    created_at: datetime
    
    class Config:
        """Pydantic config."""
        populate_by_name = True
