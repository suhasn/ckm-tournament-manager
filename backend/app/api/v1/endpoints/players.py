"""Player endpoints."""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from bson import ObjectId
from datetime import datetime
from app.db.database import get_db
from app.api.v1.dependencies import get_current_arbiter, get_current_user
from app.schemas.player import (
    PlayerCreateRequest,
    PlayerUpdateRequest,
    PlayerResponse,
    PlayerListResponse,
    BulkPlayerImportRequest,
    BulkPlayerImportResponse
)
from app.core.constants import PlayerStatus
from app.utils.validators import validate_player_rating

router = APIRouter()


@router.post("/{tournament_id}", response_model=PlayerResponse, status_code=status.HTTP_201_CREATED)
async def add_player(
    tournament_id: str,
    request: PlayerCreateRequest,
    current_user = Depends(get_current_arbiter),
    db = Depends(get_db)
):
    """Add player to tournament."""
    
    validate_player_rating(request.rating)
    
    # Verify tournament exists
    tournament = await db["tournaments"].find_one({"_id": ObjectId(tournament_id)})
    if not tournament:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tournament not found")
    
    player_data = {
        "tournament_id": tournament_id,
        "name": request.name,
        "federation_code": request.federation_code,
        "rating": request.rating,
        "date_of_birth": request.date_of_birth,
        "email": request.email,
        "club": request.club,
        "special_notes": request.special_notes,
        "status": PlayerStatus.REGISTERED,
        "points": 0.0,
        "buchholz_score": 0.0,
        "sonneborn_berger_score": 0.0,
        "games_played": 0,
        "byes": 0,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }
    
    result = await db["players"].insert_one(player_data)
    player_data["_id"] = result.inserted_id
    
    # Update tournament player count
    await db["tournaments"].update_one(
        {"_id": ObjectId(tournament_id)},
        {"$inc": {"total_players": 1}}
    )
    
    return PlayerResponse(
        id=str(player_data["_id"]),
        **{k: v for k, v in player_data.items() if k != "_id"}
    )


@router.get("/{tournament_id}", response_model=PlayerListResponse)
async def list_players(
    tournament_id: str,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    current_user = Depends(get_current_user),
    db = Depends(get_db)
):
    """List players in tournament."""
    
    skip = (page - 1) * page_size
    
    # Get total count
    total = await db["players"].count_documents({"tournament_id": tournament_id})
    
    # Get players
    players = await db["players"].find({"tournament_id": tournament_id}).skip(skip).limit(page_size).to_list(None)
    
    player_responses = [
        PlayerResponse(
            id=str(p["_id"]),
            **{k: v for k, v in p.items() if k != "_id"}
        )
        for p in players
    ]
    
    return PlayerListResponse(
        players=player_responses,
        total=total,
        page=page,
        page_size=page_size
    )


@router.post("/{tournament_id}/import", response_model=BulkPlayerImportResponse)
async def bulk_import_players(
    tournament_id: str,
    request: BulkPlayerImportRequest,
    current_user = Depends(get_current_arbiter),
    db = Depends(get_db)
):
    """Bulk import players to tournament."""
    
    # Verify tournament exists
    tournament = await db["tournaments"].find_one({"_id": ObjectId(tournament_id)})
    if not tournament:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tournament not found")
    
    imported = 0
    failed = 0
    errors = []
    
    for player_req in request.players:
        try:
            validate_player_rating(player_req.rating)
            
            player_data = {
                "tournament_id": tournament_id,
                **player_req.dict(),
                "status": PlayerStatus.REGISTERED,
                "points": 0.0,
                "buchholz_score": 0.0,
                "sonneborn_berger_score": 0.0,
                "games_played": 0,
                "byes": 0,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow(),
            }
            
            await db["players"].insert_one(player_data)
            imported += 1
        except Exception as e:
            failed += 1
            errors.append(f"Failed to import {player_req.name}: {str(e)}")
    
    # Update tournament player count
    await db["tournaments"].update_one(
        {"_id": ObjectId(tournament_id)},
        {"$inc": {"total_players": imported}}
    )
    
    return BulkPlayerImportResponse(
        imported=imported,
        failed=failed,
        errors=errors
    )


@router.put("/{player_id}", response_model=PlayerResponse)
async def update_player(
    player_id: str,
    request: PlayerUpdateRequest,
    current_user = Depends(get_current_arbiter),
    db = Depends(get_db)
):
    """Update player."""
    
    try:
        player = await db["players"].find_one({"_id": ObjectId(player_id)})
    except:
        player = None
    
    if not player:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Player not found")
    
    update_data = {k: v for k, v in request.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await db["players"].update_one({"_id": ObjectId(player_id)}, {"$set": update_data})
    
    updated = await db["players"].find_one({"_id": ObjectId(player_id)})
    return PlayerResponse(
        id=str(updated["_id"]),
        **{k: v for k, v in updated.items() if k != "_id"}
    )


@router.delete("/{player_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_player(
    player_id: str,
    current_user = Depends(get_current_arbiter),
    db = Depends(get_db)
):
    """Delete player."""
    
    try:
        player = await db["players"].find_one({"_id": ObjectId(player_id)})
    except:
        player = None
    
    if not player:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Player not found")
    
    await db["players"].delete_one({"_id": ObjectId(player_id)})
    
    # Update tournament player count
    await db["tournaments"].update_one(
        {"_id": ObjectId(player["tournament_id"])},
        {"$inc": {"total_players": -1}}
    )
