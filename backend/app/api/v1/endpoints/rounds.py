"""Round and pairing endpoints."""

from fastapi import APIRouter, Depends, HTTPException, status
from bson import ObjectId
from datetime import datetime
from app.db.database import get_db
from app.api.v1.dependencies import get_current_arbiter, get_current_user
from app.schemas.round import RoundCreateRequest, RoundResponse, RoundListResponse, PairingResponse
from app.core.constants import RoundStatus
from app.utils.swiss_algorithm import SwissAlgorithm

router = APIRouter()


@router.post("/{tournament_id}/generate", response_model=RoundResponse)
async def generate_pairings(
    tournament_id: str,
    current_user = Depends(get_current_arbiter),
    db = Depends(get_db)
):
    """Generate pairings for next round using Swiss algorithm."""
    
    # Verify tournament exists
    tournament = await db["tournaments"].find_one({"_id": ObjectId(tournament_id)})
    if not tournament:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tournament not found")
    
    round_number = tournament.get("current_round", 0) + 1
    
    if round_number > tournament["number_of_rounds"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot generate pairings beyond tournament rounds"
        )
    
    # Get all players
    players = await db["players"].find({"tournament_id": tournament_id}).to_list(None)
    player_dicts = [
        {
            "id": str(p["_id"]),
            "name": p["name"],
            "points": p.get("points", 0.0),
            "rating": p.get("rating", 0),
            "byes": p.get("byes", 0),
        }
        for p in players
    ]
    
    # Get played pairings
    played_results = await db["results"].find({"tournament_id": tournament_id}).to_list(None)
    played_pairings = set()
    for result in played_results:
        # Get pairing details
        pairing = await db["pairings"].find_one({"_id": ObjectId(result["pairing_id"])})
        if pairing:
            pair = tuple(sorted([str(pairing["white_player_id"]), str(pairing["black_player_id"])]))
            played_pairings.add(pair)
    
    # Generate pairings using Swiss algorithm
    swiss = SwissAlgorithm(player_dicts, played_pairings)
    pairings = swiss.generate_pairings()
    color_assignments = swiss.assign_colors()
    
    # Create round
    round_data = {
        "tournament_id": tournament_id,
        "round_number": round_number,
        "status": RoundStatus.DRAFT,
        "pairings": [],
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }
    
    round_result = await db["rounds"].insert_one(round_data)
    round_id = str(round_result.inserted_id)
    
    # Create pairings
    pairing_ids = []
    for idx, assignment in enumerate(color_assignments, 1):
        pairing_data = {
            "tournament_id": tournament_id,
            "round_id": round_id,
            "round_number": round_number,
            "board_number": idx,
            "white_player_id": assignment["white_id"],
            "black_player_id": assignment["black_id"],
            "is_bye": assignment.get("is_bye", False),
            "result": None,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
        }
        
        pairing_result = await db["pairings"].insert_one(pairing_data)
        pairing_ids.append(str(pairing_result.inserted_id))
    
    # Update round with pairing IDs
    await db["rounds"].update_one(
        {"_id": ObjectId(round_id)},
        {"$set": {"pairings": pairing_ids}}
    )
    
    # Fetch the created round
    round_doc = await db["rounds"].find_one({"_id": ObjectId(round_id)})
    
    return RoundResponse(
        id=str(round_doc["_id"]),
        **{k: v for k, v in round_doc.items() if k != "_id"}
    )


@router.get("/{tournament_id}", response_model=RoundListResponse)
async def list_rounds(
    tournament_id: str,
    current_user = Depends(get_current_user),
    db = Depends(get_db)
):
    """List rounds in tournament."""
    
    rounds = await db["rounds"].find({"tournament_id": tournament_id}).to_list(None)
    
    round_responses = []
    for r in rounds:
        pairings = []
        for pairing_id in r.get("pairings", []):
            try:
                pairing = await db["pairings"].find_one({"_id": ObjectId(pairing_id)})
                if pairing:
                    pairings.append(
                        PairingResponse(
                            id=str(pairing["_id"]),
                            **{k: v for k, v in pairing.items() if k != "_id"}
                        )
                    )
            except:
                pass
        
        round_responses.append(
            RoundResponse(
                id=str(r["_id"]),
                round_number=r["round_number"],
                status=r["status"],
                pairings=pairings,
                created_at=r["created_at"].isoformat()
            )
        )
    
    return RoundListResponse(
        rounds=round_responses,
        total=len(round_responses)
    )


@router.put("/{round_id}/start", response_model=RoundResponse)
async def start_round(
    round_id: str,
    current_user = Depends(get_current_arbiter),
    db = Depends(get_db)
):
    """Start a round."""
    
    try:
        round_doc = await db["rounds"].find_one({"_id": ObjectId(round_id)})
    except:
        round_doc = None
    
    if not round_doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Round not found")
    
    await db["rounds"].update_one(
        {"_id": ObjectId(round_id)},
        {"$set": {"status": RoundStatus.ACTIVE, "started_at": datetime.utcnow()}}
    )
    
    updated = await db["rounds"].find_one({"_id": ObjectId(round_id)})
    return RoundResponse(
        id=str(updated["_id"]),
        **{k: v for k, v in updated.items() if k != "_id"}
    )
