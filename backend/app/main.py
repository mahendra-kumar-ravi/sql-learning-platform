from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import engine, get_db
from .models import Base

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="SQL Platform API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "SQL Platform Backend API - FastAPI + PostgreSQL"}

@app.get("/health")
async def health(db: Session = Depends(get_db)):
    return {"status": "healthy", "db_connected": True}

from .routers import auth, progress, leaderboard, admin

app.include_router(auth.router)
app.include_router(progress.router)
app.include_router(leaderboard.router)
app.include_router(admin.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


