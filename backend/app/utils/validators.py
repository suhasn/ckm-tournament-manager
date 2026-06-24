"""Data validators."""

from datetime import datetime
from app.core.constants import MIN_PLAYERS, MAX_PLAYERS, MIN_ROUNDS, MAX_ROUNDS
from app.core.exceptions import BadRequestException


def validate_tournament_data(
    num_players: int,
    num_rounds: int,
    start_date: datetime
) -> None:
    """Validate tournament data."""
    
    if num_players < MIN_PLAYERS or num_players > MAX_PLAYERS:
        raise BadRequestException(
            f"Number of players must be between {MIN_PLAYERS} and {MAX_PLAYERS}"
        )
    
    if num_rounds < MIN_ROUNDS or num_rounds > MAX_ROUNDS:
        raise BadRequestException(
            f"Number of rounds must be between {MIN_ROUNDS} and {MAX_ROUNDS}"
        )
    
    if start_date < datetime.now():
        raise BadRequestException("Tournament start date cannot be in the past")


def validate_player_rating(rating: int) -> None:
    """Validate player rating."""
    if rating < 0 or rating > 5000:
        raise BadRequestException("Invalid rating. Must be between 0 and 5000")


def validate_pairing_not_duplicate(
    player1_id: str,
    player2_id: str,
    played_pairings: set
) -> None:
    """Validate that players haven't already played."""
    pairing = tuple(sorted([player1_id, player2_id]))
    if pairing in played_pairings:
        raise BadRequestException("These players have already played each other")
