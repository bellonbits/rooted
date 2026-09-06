from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import get_current_user
from app.db.session import get_db
from app.models.journal import JournalEntry
from app.models.user import User
from app.schemas.journal import JournalEntryCreate, JournalEntryOut

router = APIRouter(prefix='/journal', tags=['journal'])


@router.get('', response_model=list[JournalEntryOut])
async def list_entries(
    user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)
) -> list[JournalEntry]:
    result = await db.scalars(
        select(JournalEntry).where(JournalEntry.user_id == user.id).order_by(JournalEntry.created_at.desc())
    )
    return list(result.all())


@router.post('', response_model=JournalEntryOut, status_code=201)
async def create_entry(
    payload: JournalEntryCreate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> JournalEntry:
    entry = JournalEntry(user_id=user.id, **payload.model_dump())
    db.add(entry)
    await db.commit()
    await db.refresh(entry)
    return entry
