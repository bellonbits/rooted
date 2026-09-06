from fastapi import APIRouter

from app.api.v1 import ai, annotations, auth, bible, community, journal, lessons, prayer, progress, users

router = APIRouter()
router.include_router(auth.router)
router.include_router(users.router)
router.include_router(bible.router)
router.include_router(annotations.router)
router.include_router(lessons.router)
router.include_router(ai.router)
router.include_router(prayer.router)
router.include_router(journal.router)
router.include_router(progress.router)
router.include_router(community.router)
