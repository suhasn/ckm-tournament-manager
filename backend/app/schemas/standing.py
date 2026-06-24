"""Standing schemas for API requests/responses."""

from typing import List
from pydantic import BaseModel


class StandingResponse(BaseModel):
    """Standing response schema."""
    rank: int
    player_id: str
    player_name: str
    rating: int
    points: float
    buchholz_score: float
    sonneborn_berger_score: float
    games_played: int


class StandingsListResponse(BaseModel):
    """Standings list response schema."""
    tournament_id: str
    standings: List[StandingResponse]
    total_players: int
    round_number: int
