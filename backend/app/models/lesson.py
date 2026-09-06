import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, UniqueConstraint, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Course(Base):
    __tablename__ = 'courses'

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(80), unique=True)
    title: Mapped[str] = mapped_column(String(150))
    description: Mapped[str] = mapped_column(String(500), default='')

    lessons: Mapped[list['Lesson']] = relationship(
        back_populates='course', order_by='Lesson.day', lazy='selectin'
    )


class Lesson(Base):
    __tablename__ = 'lessons'

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    course_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey('courses.id'))
    day: Mapped[int] = mapped_column(Integer)
    title: Mapped[str] = mapped_column(String(150))
    scripture_reference: Mapped[str] = mapped_column(String(80), default='')
    body: Mapped[str] = mapped_column(String, default='')

    course: Mapped['Course'] = relationship(back_populates='lessons')


class UserLessonProgress(Base):
    __tablename__ = 'user_lesson_progress'
    __table_args__ = (UniqueConstraint('user_id', 'lesson_id'),)

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey('users.id'))
    lesson_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey('lessons.id'))
    completed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
