from app.schemas.base import CamelModel


class ProgressOut(CamelModel):
    lessons_completed: int
    lessons_total: int
    journal_entries: int
    prayer_entries: int
