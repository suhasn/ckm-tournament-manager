"""API v1 routes."""

from fastapi import APIRouter
from app.api.v1.endpoints import auth, tournaments, players, rounds, results, standings

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(tournaments.router, prefix="/tournaments", tags=["tournaments"])
api_router.include_router(players.router, prefix="/players", tags=["players"])
api_router.include_router(rounds.router, prefix="/rounds", tags=["rounds"])
api_router.include_router(results.router, prefix="/results", tags=["results"])
api_router.include_router(standings.router, prefix="/standings", tags=["standings"])
