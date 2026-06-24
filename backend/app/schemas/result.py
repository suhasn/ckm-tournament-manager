"""Result schemas for API requests/responses."""

from typing import Optional
from pydantic import BaseModel
from app.core.constants import ResultStatus


class ResultCreateRequest(BaseModel):
    """Result creation request schema."""
    pairing_id: str
    white_result: ResultStatus
    black_result: ResultStatus
    notes: Optional[str] = None


class ResultUpdateRequest(BaseModel):
    """Result update request schema."""
    white_result: Optional[ResultStatus] = None
    black_result: Optional[ResultStatus] = None
    notes: Optional[str] = None


class ResultResponse(BaseModel):
    """Result response schema."""
    id: str
    pairing_id: str
    white_result: ResultStatus
    black_result: ResultStatus
    notes: Optional[str]
    created_at: str
