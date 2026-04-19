from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional
from uuid import UUID
from .models import UserRole

class UserBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr

class UserCreate(UserBase):
    password: str = Field(..., min_length=8)

class UserOut(UserBase):
    id: UUID
    role: UserRole
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class ProgressCreate(BaseModel):
    track_id: str
    question_id: int

class ProgressOut(BaseModel):
    track_id: str
    question_id: int
    completed_at: datetime

class LeaderboardOut(BaseModel):
    username: str
    track_id: str
    score: int
    rank: int

