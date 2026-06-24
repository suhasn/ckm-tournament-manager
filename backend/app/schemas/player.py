"""Player schemas for API requests/responses."""

from datetime import date
from typing import List, Optional
from pydantic import BaseModel, EmailStr
from app.core.constants import PlayerStatus


class PlayerCreateRequest(BaseModel):
    """Player creation request schema."""
    name: str
    federation_code: str
    rating: int
    date_of_birth: Optional[date] = None
    email: Optional[EmailStr] = None
    club: Optional[str] = None
    special_notes: Optional[str] = None


class PlayerUpdateRequest(BaseModel):
    """Player update request schema."""
    name: Optional[str] = None
    rating: Optional[int] = None
    email: Optional[EmailStr] = None
    club: Optional[str] = None
    status: Optional[PlayerStatus] = None
    special_notes: Optional[str] = None


class PlayerResponse(BaseModel):
    """Player response schema."""
    id: str
    name: str
    federation_code: str
    rating: int
    club: Optional[str]
    status: PlayerStatus
    points: float
    games_played: int
    created_at: date


class PlayerListResponse(BaseModel):
    """Player list response schema."""
    players: List[PlayerResponse]
    total: int
    page: int
    page_size: int


class BulkPlayerImportRequest(BaseModel):
    """Bulk import players request schema."""
    players: List[PlayerCreateRequest]


class BulkPlayerImportResponse(BaseModel):
    """Bulk import response schema."""
    imported: int
    failed: int
    errors: List[str]
