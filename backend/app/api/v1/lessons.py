import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import get_current_user
from app.db.session import get_db
from app.models.lesson import Course, UserLessonProgress
from app.models.user import User
from app.schemas.lesson import CourseOut

router = APIRouter(prefix='/lessons', tags=['lessons'])


@router.get('/courses', response_model=list[CourseOut])
async def list_courses(db: AsyncSession = Depends(get_db)) -> list[Course]:
    result = await db.scalars(select(Course))
    return list(result.all())


@router.get('/courses/{slug}', response_model=CourseOut)
async def get_course(slug: str, db: AsyncSession = Depends(get_db)) -> Course:
    course = await db.scalar(select(Course).where(Course.slug == slug))
    if course is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, 'Course not found')
    return course


@router.post('/{lesson_id}/complete', status_code=status.HTTP_204_NO_CONTENT)
async def complete_lesson(
    lesson_id: uuid.UUID,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> None:
    existing = await db.scalar(
        select(UserLessonProgress).where(
            UserLessonProgress.user_id == user.id, UserLessonProgress.lesson_id == lesson_id
        )
    )
    if existing is None:
        try:
            db.add(UserLessonProgress(user_id=user.id, lesson_id=lesson_id))
            await db.commit()
        except IntegrityError:
            # Concurrent request already inserted the row — lesson is complete, no-op.
            await db.rollback()
