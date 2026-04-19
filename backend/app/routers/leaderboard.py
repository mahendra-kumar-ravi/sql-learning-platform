from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas
from ..dependencies import DatabaseDep

router = APIRouter(prefix="/leaderboards", tags=["leaderboard"])

@router.get("/{track_id}", response_model=List[schemas.LeaderboardOut])
def get_leaderboard(
    track_id: str,
    limit: int = Query(default=100, ge=1, le=100),
    db: Session = Depends(DatabaseDep)
):
    return crud.get_leaderboard(db, track_id, limit)

