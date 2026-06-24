"""Tournament model."""

from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field
from app.core.constants import TournamentStatus, TimeControl, RatingType, TiebreakSystem


class TournamentBase(BaseModel):
    """Base tournament schema."""
    name: str
    location: str
    start_date: datetime
    number_of_rounds: int
    time_control: TimeControl
    rating_type: RatingType = RatingType.FIDE
    chief_arbiter: str
    contact_email: Optional[str] = None
    tiebreak_systems: List[TiebreakSystem] = [TiebreakSystem.BUCHHOLZ, TiebreakSystem.SONNEBORN_BERGER]


class TournamentCreate(TournamentBase):
    """Tournament creation schema."""
    organizer_id: str


class Tournament(TournamentBase):
    """Tournament model."""
    id: str = Field(alias="_id")
    organizer_id: str
    status: TournamentStatus = TournamentStatus.DRAFT
    total_players: int = 0
    current_round: int = 0
    created_at: datetime
    updated_at: datetime
    
    class Config:
        """Pydantic config."""
        populate_by_name = True


class TournamentResponse(Tournament):
    """Tournament response schema."""
    pass
