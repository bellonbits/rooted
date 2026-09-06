import uuid
from datetime import datetime

from app.schemas.base import CamelModel


class JournalEntryCreate(CamelModel):
    scripture_reference: str = ''
    learned: str = ''
    teaching: str = ''
    prayer: str = ''


class JournalEntryOut(JournalEntryCreate):
    id: uuid.UUID
    created_at: datetime


class PrayerEntryCreate(CamelModel):
    topic: str
    content: str = ''


class PrayerEntryOut(PrayerEntryCreate):
    id: uuid.UUID
    created_at: datetime
