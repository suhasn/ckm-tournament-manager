"""Result model."""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from app.core.constants import ResultStatus


class ResultBase(BaseModel):
    """Base result schema."""
    pairing_id: str
    white_result: ResultStatus
    black_result: ResultStatus


class ResultCreate(ResultBase):
    """Result creation schema."""
    pass


class Result(ResultBase):
    """Result model."""
    id: str = Field(alias="_id")
    tournament_id: str
    round_id: str
    created_at: datetime
    updated_at: datetime
    created_by: str
    
    class Config:
        """Pydantic config."""
        populate_by_name = True


class ResultResponse(Result):
    """Result response schema."""
    pass


class ResultUpdate(BaseModel):
    """Result update schema."""
    white_result: Optional[ResultStatus] = None
    black_result: Optional[ResultStatus] = None
    notes: Optional[str] = None
