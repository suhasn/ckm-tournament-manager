"""Standings endpoints."""

from fastapi import APIRouter, Depends, HTTPException, status
from bson import ObjectId
from app.db.database import get_db
from app.api.v1.dependencies import get_current_user
from app.schemas.standing import StandingsListResponse, StandingResponse
from app.utils.swiss_algorithm import calculate_buchholz_score, calculate_sonneborn_berger

router = APIRouter()


@router.get("/{tournament_id}", response_model=StandingsListResponse)
async def get_standings(
    tournament_id: str,
    current_user = Depends(get_current_user),
    db = Depends(get_db)
):
    """Get tournament standings."""
    
    # Verify tournament exists
    tournament = await db["tournaments"].find_one({"_id": ObjectId(tournament_id)})
    if not tournament:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tournament not found")
    
    # Get all players
    players = await db["players"].find({"tournament_id": tournament_id}).to_list(None)
    
    # Calculate standings
    standings_list = []
    for player in players:
        standing = StandingResponse(
            rank=0,  # Will be set after sorting
            player_id=str(player["_id"]),
            player_name=player["name"],
            rating=player["rating"],
            points=player.get("points", 0.0),
            buchholz_score=player.get("buchholz_score", 0.0),
            sonneborn_berger_score=player.get("sonneborn_berger_score", 0.0),
            games_played=player.get("games_played", 0)
        )
        standings_list.append(standing)
    
    # Sort by points (desc), then by tiebreaks
    standings_list.sort(
        key=lambda x: (-x.points, -x.buchholz_score, -x.sonneborn_berger_score),
        reverse=False
    )
    
    # Assign ranks
    for idx, standing in enumerate(standings_list, 1):
        standing.rank = idx
    
    return StandingsListResponse(
        tournament_id=tournament_id,
        standings=standings_list,
        total_players=len(standings_list),
        round_number=tournament.get("current_round", 0)
    )
