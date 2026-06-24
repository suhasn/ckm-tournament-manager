"""Result endpoints."""

from fastapi import APIRouter, Depends, HTTPException, status
from bson import ObjectId
from datetime import datetime
from app.db.database import get_db
from app.api.v1.dependencies import get_current_arbiter
from app.schemas.result import ResultCreateRequest, ResultResponse
from app.core.constants import ResultStatus

router = APIRouter()


@router.post("", response_model=ResultResponse, status_code=status.HTTP_201_CREATED)
async def enter_result(
    request: ResultCreateRequest,
    current_user = Depends(get_current_arbiter),
    db = Depends(get_db)
):
    """Enter result for a pairing."""
    
    # Get pairing
    try:
        pairing = await db["pairings"].find_one({"_id": ObjectId(request.pairing_id)})
    except:
        pairing = None
    
    if not pairing:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pairing not found")
    
    # Check if result already exists
    existing = await db["results"].find_one({"pairing_id": request.pairing_id})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Result already entered for this pairing"
        )
    
    result_data = {
        "pairing_id": request.pairing_id,
        "tournament_id": pairing["tournament_id"],
        "round_id": pairing["round_id"],
        "white_result": request.white_result,
        "black_result": request.black_result,
        "created_by": str(current_user["_id"]),
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }
    
    result = await db["results"].insert_one(result_data)
    result_data["_id"] = result.inserted_id
    
    # Update player points
    white_player_id = pairing["white_player_id"]
    black_player_id = pairing["black_player_id"]
    
    white_points = _result_to_points(request.white_result)
    black_points = _result_to_points(request.black_result)
    
    if not pairing.get("is_bye", False):
        await db["players"].update_one(
            {"_id": ObjectId(white_player_id)},
            {
                "$inc": {"points": white_points, "games_played": 1},
                "$set": {"updated_at": datetime.utcnow()}
            }
        )
        
        await db["players"].update_one(
            {"_id": ObjectId(black_player_id)},
            {
                "$inc": {"points": black_points, "games_played": 1},
                "$set": {"updated_at": datetime.utcnow()}
            }
        )
    
    return ResultResponse(
        id=str(result_data["_id"]),
        **{k: v for k, v in result_data.items() if k != "_id"}
    )


def _result_to_points(result: ResultStatus) -> float:
    """Convert result to points."""
    if result == ResultStatus.WIN:
        return 1.0
    elif result == ResultStatus.DRAW:
        return 0.5
    elif result == ResultStatus.BYE:
        return 1.0
    else:
        return 0.0
