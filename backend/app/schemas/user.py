"""User schemas for API requests/responses."""

from pydantic import BaseModel, EmailStr
from app.core.constants import UserRole


class LoginRequest(BaseModel):
    """Login request schema."""
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    """Token response schema."""
    access_token: str
    token_type: str = "bearer"
    expires_in: int


class RegisterRequest(BaseModel):
    """Registration request schema."""
    email: EmailStr
    password: str
    full_name: str
    role: UserRole = UserRole.PLAYER


class PasswordChangeRequest(BaseModel):
    """Password change request schema."""
    old_password: str
    new_password: str


class PasswordResetRequest(BaseModel):
    """Password reset request schema."""
    email: EmailStr


class PasswordResetConfirm(BaseModel):
    """Password reset confirmation schema."""
    token: str
    new_password: str
