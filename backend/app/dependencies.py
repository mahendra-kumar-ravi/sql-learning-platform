# Common dependencies for reuse
from fastapi import Depends
from sqlalchemy.orm import Session
from .database import get_db

DatabaseDep = Session = Depends(get_db)

