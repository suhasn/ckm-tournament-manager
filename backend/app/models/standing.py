"""Standing model."""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class StandingBase(BaseModel):
    """Base standing schema."""
    player_id: str
    player_name: str
    rating: int


class Standing(StandingBase):
    """Standing model."""
    id: str = Field(alias="_id")
    tournament_id: str
    rank: int
    points: float
    buchholz_score: float
    sonneborn_berger_score: float
    games_played: int
    created_at: datetime
    
    class Config:
        """Pydantic config."""
        populate_by_name = True


class StandingResponse(Standing):
    """Standing response schema."""
    pass
