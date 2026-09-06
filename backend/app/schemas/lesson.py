import uuid

from app.schemas.base import CamelModel


class LessonOut(CamelModel):
    id: uuid.UUID
    day: int
    title: str
    scripture_reference: str
    body: str


class CourseOut(CamelModel):
    id: uuid.UUID
    slug: str
    title: str
    description: str
    lessons: list[LessonOut]


class LessonProgressOut(CamelModel):
    lesson_id: uuid.UUID
    completed: bool
