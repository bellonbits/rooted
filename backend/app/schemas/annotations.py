import uuid
from datetime import datetime

from app.schemas.base import CamelModel


class VerseRef(CamelModel):
    translation: str
    book: str
    chapter: int
    verse: int


class BookmarkOut(VerseRef):
    id: uuid.UUID
    created_at: datetime


class BookmarkToggleOut(CamelModel):
    bookmarked: bool


class HighlightIn(VerseRef):
    color: str = 'yellow'


class HighlightOut(HighlightIn):
    id: uuid.UUID
    created_at: datetime


class NoteIn(VerseRef):
    content: str


class NoteOut(NoteIn):
    id: uuid.UUID
    created_at: datetime
