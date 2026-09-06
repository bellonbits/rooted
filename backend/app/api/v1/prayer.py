from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import get_current_user
from app.db.session import get_db
from app.models.journal import PrayerEntry
from app.models.user import User
from app.schemas.journal import PrayerEntryCreate, PrayerEntryOut

router = APIRouter(prefix='/prayer', tags=['prayer'])


@router.get('', response_model=list[PrayerEntryOut])
async def list_prayers(
    user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)
) -> list[PrayerEntry]:
    result = await db.scalars(
        select(PrayerEntry).where(PrayerEntry.user_id == user.id).order_by(PrayerEntry.created_at.desc())
    )
    return list(result.all())


@router.post('', response_model=PrayerEntryOut, status_code=201)
async def create_prayer(
    payload: PrayerEntryCreate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> PrayerEntry:
    entry = PrayerEntry(user_id=user.id, **payload.model_dump())
    db.add(entry)
    await db.commit()
    await db.refresh(entry)
    return entry
