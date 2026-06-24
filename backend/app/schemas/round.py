"""Round and pairing schemas for API requests/responses."""

from typing import List, Optional
from pydantic import BaseModel
from app.core.constants import RoundStatus


class PairingResponse(BaseModel):
    """Pairing response schema."""
    id: str
    round_number: int
    board_number: int
    white_player_id: str
    white_player_name: str
    black_player_id: str
    black_player_name: str
    result: Optional[str]


class RoundCreateRequest(BaseModel):
    """Round creation request schema."""
    round_number: int


class RoundResponse(BaseModel):
    """Round response schema."""
    id: str
    round_number: int
    status: RoundStatus
    pairings: List[PairingResponse]
    created_at: str


class AdjustPairingRequest(BaseModel):
    """Adjust pairing request schema."""
    white_player_id: Optional[str] = None
    black_player_id: Optional[str] = None


class RoundListResponse(BaseModel):
    """Round list response schema."""
    rounds: List[RoundResponse]
    total: int
