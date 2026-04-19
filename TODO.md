# Frontend Integration Plan
Status: [PLAN APPROVED] - Ready to Implement

## Current Progress
✅ Backend Complete

## Implementation Steps (Logical Breakdown)

### Step 1: Wire Auth Handlers ✅
- Edit js/auth.js: Add event listeners for #authForm submit (login/register tabs)
- Integrate api.js register/login calls
- Update navbar user status on success

### Step 2: Fix UI & Init ✅
- Edit index.html: Remove inline onclick (handled in JS)
- Edit js/app.js: Add DOMContentLoaded init for navbar/user state/modals
- Update user menu visibility (login/logout btns)

### Step 3: Track Integration ✅
- Edit js/app.js: Added loadTracks() for index.html tracks-grid with progress per track from local cache
- Fixed getProgressData() sync local (API save syncs server)
- Track cards click to track.html?track=ID with hybrid guest/logged progress already wired

### Step 4: Testing [PENDING]
- Backend: docker-compose up postgres, uvicorn
- Frontend: Test register/login, progress sync, leaderboard
- Mark complete

**Next Action:** Implement Step 1, then update TODO.md
