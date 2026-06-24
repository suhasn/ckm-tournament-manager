"""Round and pairing models."""

from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field
from app.core.constants import RoundStatus


class PairingBase(BaseModel):
    """Base pairing schema."""
    round_number: int
    board_number: int
    white_player_id: str
    black_player_id: str


class PairingCreate(PairingBase):
    """Pairing creation schema."""
    tournament_id: str


class Pairing(PairingBase):
    """Pairing model."""
    id: str = Field(alias="_id")
    tournament_id: str
    white_player_name: str = ""
    black_player_name: str = ""
    result: Optional[str] = None  # "1-0", "0-1", "0.5-0.5", "bye", etc.
    created_at: datetime
    updated_at: datetime
    
    class Config:
        """Pydantic config."""
        populate_by_name = True


class RoundBase(BaseModel):
    """Base round schema."""
    round_number: int
    tournament_id: str


class RoundCreate(RoundBase):
    """Round creation schema."""
    pass


class Round(RoundBase):
    """Round model."""
    id: str = Field(alias="_id")
    status: RoundStatus = RoundStatus.DRAFT
    pairings: List[str] = []  # List of pairing IDs
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        """Pydantic config."""
        populate_by_name = True


class RoundResponse(Round):
    """Round response schema."""
    pairings: Optional[List[Pairing]] = None
