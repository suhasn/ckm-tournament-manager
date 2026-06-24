"""Tournament endpoints."""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from bson import ObjectId
from datetime import datetime
from app.db.database import get_db
from app.api.v1.dependencies import get_current_arbiter, get_current_user
from app.schemas.tournament import (
    TournamentCreateRequest,
    TournamentUpdateRequest,
    TournamentResponse,
    TournamentListResponse
)
from app.core.constants import TournamentStatus
from app.utils.validators import validate_tournament_data

router = APIRouter()


@router.post("", response_model=TournamentResponse, status_code=status.HTTP_201_CREATED)
async def create_tournament(
    request: TournamentCreateRequest,
    current_user = Depends(get_current_arbiter),
    db = Depends(get_db)
):
    """Create a new tournament."""
    
    validate_tournament_data(
        num_players=0,  # Will be set when players join
        num_rounds=request.number_of_rounds,
        start_date=request.start_date
    )
    
    tournament_data = {
        "name": request.name,
        "location": request.location,
        "start_date": request.start_date,
        "number_of_rounds": request.number_of_rounds,
        "time_control": request.time_control,
        "rating_type": request.rating_type,
        "chief_arbiter": request.chief_arbiter,
        "contact_email": request.contact_email,
        "tiebreak_systems": request.tiebreak_systems,
        "organizer_id": str(current_user["_id"]),
        "status": TournamentStatus.DRAFT,
        "total_players": 0,
        "current_round": 0,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }
    
    result = await db["tournaments"].insert_one(tournament_data)
    tournament_data["_id"] = result.inserted_id
    
    return TournamentResponse(
        id=str(tournament_data["_id"]),
        **tournament_data
    )


@router.get("", response_model=TournamentListResponse)
async def list_tournaments(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    current_user = Depends(get_current_user),
    db = Depends(get_db)
):
    """List tournaments."""
    
    skip = (page - 1) * page_size
    
    # Get total count
    total = await db["tournaments"].count_documents({})
    
    # Get tournaments
    tournaments = await db["tournaments"].find({}).skip(skip).limit(page_size).to_list(None)
    
    tournament_responses = [
        TournamentResponse(
            id=str(t["_id"]),
            **{k: v for k, v in t.items() if k != "_id"}
        )
        for t in tournaments
    ]
    
    return TournamentListResponse(
        tournaments=tournament_responses,
        total=total,
        page=page,
        page_size=page_size
    )


@router.get("/{tournament_id}", response_model=TournamentResponse)
async def get_tournament(
    tournament_id: str,
    current_user = Depends(get_current_user),
    db = Depends(get_db)
):
    """Get tournament details."""
    
    try:
        tournament = await db["tournaments"].find_one({"_id": ObjectId(tournament_id)})
    except:
        tournament = None
    
    if not tournament:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tournament not found")
    
    return TournamentResponse(
        id=str(tournament["_id"]),
        **{k: v for k, v in tournament.items() if k != "_id"}
    )


@router.put("/{tournament_id}", response_model=TournamentResponse)
async def update_tournament(
    tournament_id: str,
    request: TournamentUpdateRequest,
    current_user = Depends(get_current_arbiter),
    db = Depends(get_db)
):
    """Update tournament."""
    
    try:
        tournament = await db["tournaments"].find_one({"_id": ObjectId(tournament_id)})
    except:
        tournament = None
    
    if not tournament:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tournament not found")
    
    # Verify organizer
    if tournament["organizer_id"] != str(current_user["_id"]):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized")
    
    # Update only provided fields
    update_data = {k: v for k, v in request.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await db["tournaments"].update_one({"_id": ObjectId(tournament_id)}, {"$set": update_data})
    
    updated = await db["tournaments"].find_one({"_id": ObjectId(tournament_id)})
    return TournamentResponse(
        id=str(updated["_id"]),
        **{k: v for k, v in updated.items() if k != "_id"}
    )


@router.delete("/{tournament_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_tournament(
    tournament_id: str,
    current_user = Depends(get_current_arbiter),
    db = Depends(get_db)
):
    """Delete tournament."""
    
    try:
        tournament = await db["tournaments"].find_one({"_id": ObjectId(tournament_id)})
    except:
        tournament = None
    
    if not tournament:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tournament not found")
    
    # Verify organizer
    if tournament["organizer_id"] != str(current_user["_id"]):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized")
    
    await db["tournaments"].delete_one({"_id": ObjectId(tournament_id)})
