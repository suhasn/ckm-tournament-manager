"""Player model."""

from datetime import datetime, date
from typing import Optional
from pydantic import BaseModel, Field, EmailStr
from app.core.constants import PlayerStatus


class PlayerBase(BaseModel):
    """Base player schema."""
    name: str
    federation_code: str
    rating: int
    date_of_birth: Optional[date] = None
    email: Optional[EmailStr] = None
    club: Optional[str] = None
    special_notes: Optional[str] = None


class PlayerCreate(PlayerBase):
    """Player creation schema."""
    tournament_id: str


class Player(PlayerBase):
    """Player model."""
    id: str = Field(alias="_id")
    tournament_id: str
    status: PlayerStatus = PlayerStatus.REGISTERED
    points: float = 0.0
    buchholz_score: float = 0.0
    sonneborn_berger_score: float = 0.0
    games_played: int = 0
    byes: int = 0
    created_at: datetime
    updated_at: datetime
    
    class Config:
        """Pydantic config."""
        populate_by_name = True


class PlayerResponse(Player):
    """Player response schema."""
    pass


class PlayerBulkImport(BaseModel):
    """Bulk import players."""
    tournament_id: str
    players: List[PlayerBase]
