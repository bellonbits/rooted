from fastapi import APIRouter, Depends, Query, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import get_current_user
from app.db.session import get_db
from app.models.annotations import Bookmark, Highlight, Note
from app.models.user import User
from app.schemas.annotations import (
    BookmarkOut,
    BookmarkToggleOut,
    HighlightIn,
    HighlightOut,
    NoteIn,
    NoteOut,
    VerseRef,
)

router = APIRouter(prefix='/bible', tags=['bible-annotations'])


@router.get('/bookmarks', response_model=list[BookmarkOut])
async def list_bookmarks(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)) -> list[Bookmark]:
    result = await db.scalars(select(Bookmark).where(Bookmark.user_id == user.id))
    return list(result.all())


@router.post('/bookmarks/toggle', response_model=BookmarkToggleOut)
async def toggle_bookmark(
    ref: VerseRef, user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)
) -> BookmarkToggleOut:
    existing = await db.scalar(
        select(Bookmark).where(
            Bookmark.user_id == user.id,
            Bookmark.translation == ref.translation,
            Bookmark.book == ref.book,
            Bookmark.chapter == ref.chapter,
            Bookmark.verse == ref.verse,
        )
    )
    if existing is not None:
        await db.delete(existing)
        await db.commit()
        return BookmarkToggleOut(bookmarked=False)

    db.add(Bookmark(user_id=user.id, **ref.model_dump()))
    await db.commit()
    return BookmarkToggleOut(bookmarked=True)


@router.get('/highlights', response_model=list[HighlightOut])
async def list_highlights(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)) -> list[Highlight]:
    result = await db.scalars(select(Highlight).where(Highlight.user_id == user.id))
    return list(result.all())


@router.put('/highlights', response_model=HighlightOut)
async def upsert_highlight(
    payload: HighlightIn, user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)
) -> Highlight:
    existing = await db.scalar(
        select(Highlight).where(
            Highlight.user_id == user.id,
            Highlight.translation == payload.translation,
            Highlight.book == payload.book,
            Highlight.chapter == payload.chapter,
            Highlight.verse == payload.verse,
        )
    )
    if existing is not None:
        existing.color = payload.color
    else:
        existing = Highlight(user_id=user.id, **payload.model_dump())
        db.add(existing)
    await db.commit()
    await db.refresh(existing)
    return existing


@router.delete('/highlights', status_code=status.HTTP_204_NO_CONTENT)
async def delete_highlight(
    translation: str = Query(),
    book: str = Query(),
    chapter: int = Query(),
    verse: int = Query(),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> None:
    existing = await db.scalar(
        select(Highlight).where(
            Highlight.user_id == user.id,
            Highlight.translation == translation,
            Highlight.book == book,
            Highlight.chapter == chapter,
            Highlight.verse == verse,
        )
    )
    if existing is not None:
        await db.delete(existing)
        await db.commit()


@router.get('/notes', response_model=list[NoteOut])
async def list_notes(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)) -> list[Note]:
    result = await db.scalars(select(Note).where(Note.user_id == user.id))
    return list(result.all())


@router.put('/notes', response_model=NoteOut)
async def upsert_note(
    payload: NoteIn, user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)
) -> Note:
    existing = await db.scalar(
        select(Note).where(
            Note.user_id == user.id,
            Note.translation == payload.translation,
            Note.book == payload.book,
            Note.chapter == payload.chapter,
            Note.verse == payload.verse,
        )
    )
    if existing is not None:
        existing.content = payload.content
    else:
        existing = Note(user_id=user.id, **payload.model_dump())
        db.add(existing)
    await db.commit()
    await db.refresh(existing)
    return existing


@router.delete('/notes', status_code=status.HTTP_204_NO_CONTENT)
async def delete_note(
    translation: str = Query(),
    book: str = Query(),
    chapter: int = Query(),
    verse: int = Query(),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> None:
    existing = await db.scalar(
        select(Note).where(
            Note.user_id == user.id,
            Note.translation == translation,
            Note.book == book,
            Note.chapter == chapter,
            Note.verse == verse,
        )
    )
    if existing is not None:
        await db.delete(existing)
        await db.commit()
