from sqlalchemy.orm import Session
from sqlalchemy import select, func
from . import models, schemas
from uuid import UUID

def get_user_by_email(db: Session, email: str):
    return db.scalar(select(models.User).where(models.User.email == email))

def get_user_by_username(db: Session, username: str):
    return db.scalar(select(models.User).where(models.User.username == username))

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=user.password  # Will be hashed in service
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_progress(db: Session, user_id: UUID, track_id: str):
    stmt = select(models.UserProgress).where(
        models.UserProgress.user_id == user_id,
        models.UserProgress.track_id == track_id
    ).order_by(models.UserProgress.question_id)
    return db.scalars(stmt).all()

def create_user_progress(db: Session, user_id: UUID, progress: schemas.ProgressCreate):
    db_progress = models.UserProgress(
        user_id=user_id,
        track_id=progress.track_id,
        question_id=progress.question_id
    )
    db.add(db_progress)
    db.commit()
    db.refresh(db_progress)
    return db_progress

def update_leaderboard_score(db: Session, user_id: UUID, track_id: str, score: int):
    # Upsert leaderboard entry
    stmt = select(models.Leaderboard).where(
        models.Leaderboard.user_id == user_id,
        models.Leaderboard.track_id == track_id
    )
    existing = db.scalar(stmt)
    
    if existing:
        existing.score = score
        existing.updated_at = func.now()
    else:
        db_leaderboard = models.Leaderboard(
            user_id=user_id,
            track_id=track_id,
            score=score
        )
        db.add(db_leaderboard)
    
    db.commit()
    return existing or db_leaderboard

def get_leaderboard(db: Session, track_id: str, limit: int = 100):
    stmt = select(
        models.User.username,
        models.Leaderboard.track_id,
        models.Leaderboard.score,
        func.row_number().over(order_by=models.Leaderboard.score.desc()).label('rank')
    ).select_from(
        models.Leaderboard.join(models.User)
    ).where(
        models.Leaderboard.track_id == track_id
    ).order_by(
        models.Leaderboard.score.desc()
    ).limit(limit)
    
    result = db.execute(stmt).all()
    return [{'username': r[0], 'track_id': r[1], 'score': r[2], 'rank': r[3]} for r in result]

def get_users_admin(db: Session, skip: int = 0, limit: int = 100):
    stmt = select(models.User).offset(skip).limit(limit).order_by(models.User.created_at.desc())
    return db.scalars(stmt).all()

