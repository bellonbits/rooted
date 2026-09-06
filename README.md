# ROOTED

A peaceful, modern Christian discipleship platform helping believers read Scripture, grow in prayer, journal their spiritual journey, and connect with an AI Bible companion — with a dedicated Kids Mode for family use.

## Stack

**Frontend** — `frontend/`
- React 19 + TypeScript, built with Vite
- Tailwind CSS v4
- React Router v7, Zustand (state), TanStack Query (data fetching)
- Framer Motion + Anime.js for animation

**Backend** — `backend/`
- FastAPI (async), SQLAlchemy 2.0 + asyncpg, Alembic migrations
- PostgreSQL
- JWT auth (python-jose)
- Groq-hosted LLM for the AI Bible companion

## Features

- Full Bible reader with highlights, notes, and multiple translations
- AI Bible Companion (adult) and ROOTI, a kid-friendly AI guide
- Spiritual Journal, Prayer Room, and community discussion
- Guided daily reading plans and progress tracking
- Discipleship courses
- Kids Mode — a separate, simplified experience for children

## Getting started

### Backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in DATABASE_URL, JWT_SECRET, LLM_API_KEY, etc.
uvicorn app.main:app --reload
```

API runs at `http://localhost:8000`, health check at `/health`, routes under `/api/v1`.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env   # fill in VITE_API_URL, VITE_GROQ_API_KEY
npm run dev
```

App runs at `http://localhost:5173`.

## Project structure

```
backend/
  app/
    api/v1/       # route handlers (auth, bible, ai, journal, prayer, progress, community, ...)
    core/         # config, security, dependencies
    db/           # session/base setup
    models/       # SQLAlchemy models
    schemas/      # Pydantic schemas
    services/     # business logic (AI, Bible content)
  scripts/        # seed data

frontend/
  src/
    pages/        # route-level views (public, app, auth, onboarding)
    components/   # shared UI, layout, and kids-mode components
    layouts/      # PublicLayout, AppLayout
    store/        # Zustand stores (auth, bible, onboarding, UI)
    services/     # API clients (auth, bible, prayer, groq, tts, ...)
    constants/    # nav config, Bible book/chapter data
```

## Environment variables

Neither `.env` file is committed — copy the `.env.example` in each of `backend/` and `frontend/` and fill in real values locally.
