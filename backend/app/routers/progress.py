from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from .. import crud, schemas
from ..auth import get_current_active_user
from ..dependencies import DatabaseDep

router = APIRouter(prefix="/progress", tags=["progress"])

@router.post("/", response_model=schemas.ProgressOut, status_code=201)
def create_progress(
    progress: schemas.ProgressCreate,
    current_user = Depends(get_current_active_user),
    db: Session = Depends(DatabaseDep)
):
    return crud.create_user_progress(db, current_user.id, progress)

@router.get("/{track_id}", response_model=List[schemas.ProgressOut])
def get_progress(
    track_id: str,
    current_user = Depends(get_current_active_user),
    db: Session = Depends(DatabaseDep)
):
    return crud.get_user_progress(db, current_user.id, track_id)

