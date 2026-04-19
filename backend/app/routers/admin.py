from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas
from ..auth import get_current_active_admin
from ..dependencies import DatabaseDep

router = APIRouter(prefix="/admin", tags=["admin"])

@router.get("/users", response_model=List[schemas.UserOut])
def read_users(
    skip: int = 0,
    limit: int = 100,
    current_user = Depends(get_current_active_admin),
    db: Session = Depends(DatabaseDep)
):
    users = crud.get_users_admin(db, skip=skip, limit=limit)
    return users

