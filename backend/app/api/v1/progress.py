from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import get_current_user
from app.db.session import get_db
from app.models.journal import JournalEntry, PrayerEntry
from app.models.lesson import Lesson, UserLessonProgress
from app.models.user import User
from app.schemas.progress import ProgressOut

router = APIRouter(prefix='/progress', tags=['progress'])


@router.get('', response_model=ProgressOut)
async def get_progress(
    user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)
) -> ProgressOut:
    lessons_completed = await db.scalar(
        select(func.count()).select_from(UserLessonProgress).where(UserLessonProgress.user_id == user.id)
    )
    lessons_total = await db.scalar(select(func.count()).select_from(Lesson))
    journal_entries = await db.scalar(
        select(func.count()).select_from(JournalEntry).where(JournalEntry.user_id == user.id)
    )
    prayer_entries = await db.scalar(
        select(func.count()).select_from(PrayerEntry).where(PrayerEntry.user_id == user.id)
    )

    return ProgressOut(
        lessons_completed=lessons_completed or 0,
        lessons_total=lessons_total or 0,
        journal_entries=journal_entries or 0,
        prayer_entries=prayer_entries or 0,
    )
