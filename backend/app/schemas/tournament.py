"""Tournament schemas for API requests/responses."""

from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel
from app.core.constants import TournamentStatus, TimeControl, RatingType, TiebreakSystem


class TournamentCreateRequest(BaseModel):
    """Tournament creation request schema."""
    name: str
    location: str
    start_date: datetime
    number_of_rounds: int
    time_control: TimeControl
    rating_type: RatingType = RatingType.FIDE
    chief_arbiter: str
    contact_email: Optional[str] = None
    tiebreak_systems: List[TiebreakSystem] = [TiebreakSystem.BUCHHOLZ]


class TournamentUpdateRequest(BaseModel):
    """Tournament update request schema."""
    name: Optional[str] = None
    location: Optional[str] = None
    chief_arbiter: Optional[str] = None
    contact_email: Optional[str] = None
    tiebreak_systems: Optional[List[TiebreakSystem]] = None


class TournamentResponse(BaseModel):
    """Tournament response schema."""
    id: str
    name: str
    location: str
    start_date: datetime
    number_of_rounds: int
    time_control: TimeControl
    rating_type: RatingType
    chief_arbiter: str
    status: TournamentStatus
    total_players: int
    current_round: int
    created_at: datetime
    updated_at: datetime


class TournamentListResponse(BaseModel):
    """Tournament list response schema."""
    tournaments: List[TournamentResponse]
    total: int
    page: int
    page_size: int
