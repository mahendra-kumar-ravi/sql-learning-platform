from sqlalchemy import Column, String, Integer, ForeignKey, DateTime, Enum, func
from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlalchemy.orm import relationship
from .database import Base
import enum

class UserRole(str, enum.Enum):
    GUEST = "guest"
    USER = "user"
    ADMIN = "admin"

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(Enum(UserRole), default=UserRole.USER)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    progress = relationship("UserProgress", back_populates="user")
    leaderboards = relationship("Leaderboard", back_populates="user")

class UserProgress(Base):
    __tablename__ = "user_progress"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    track_id = Column(String(20), index=True)
    question_id = Column(Integer)
    completed_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="progress")

class Leaderboard(Base):
    __tablename__ = "leaderboards"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    track_id = Column(String(20), index=True)
    score = Column(Integer, default=0)
    updated_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="leaderboards")

