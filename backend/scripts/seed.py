"""Creates tables and seeds the 'Foundations of Faith' course.

Run with: python -m scripts.seed
Requires DATABASE_URL to point at a running Postgres instance.
"""

import asyncio

from sqlalchemy import select

from app.db.base import Base
from app.db.session import SessionLocal, engine
from app.models.lesson import Course, Lesson

FOUNDATIONS_LESSONS = [
    (
        1,
        'Who is God?',
        'Genesis 1:1',
        'In the beginning God created the heavens and the earth. Before anything else '
        'existed, God was already there. He is not part of creation - he is its source. '
        'Everything you can see, and everything you cannot, began with him.\n\n'
        "This matters because it means you were not an accident. The God who spoke galaxies "
        "into existence also formed you on purpose, for a purpose. Getting to know him is "
        "the first step of every day that follows.",
    ),
    (
        2,
        'Who is Jesus?',
        'John 1:1-14',
        'In the beginning was the Word, and the Word was with God, and the Word was God... '
        'The Word became flesh and made his dwelling among us.\n\n'
        'Jesus is not simply a good teacher or a prophet. He is God, who stepped into human '
        "history to be seen, known, and followed. Everything the New Testament claims about "
        "forgiveness and eternal life rests on who he is: fully God, fully human, and fully "
        "for you.",
    ),
    (
        3,
        'What is Salvation?',
        'Ephesians 2:8-9',
        'For it is by grace you have been saved, through faith - and this is not from '
        'yourselves, it is the gift of God - not by works, so that no one can boast.\n\n'
        'Salvation is not something you earn by being good enough. It is a gift, received by '
        'trusting what Jesus already did on the cross. That takes the pressure off performing '
        "for God's approval, and replaces it with simply receiving his love.",
    ),
    (
        4,
        'What is Grace?',
        'Romans 5:8',
        'But God demonstrates his own love for us in this: While we were still sinners, '
        'Christ died for us.\n\n'
        "Grace is getting what you don't deserve - love and forgiveness offered before you "
        "cleaned yourself up, not after. God did not wait for you to become worthy. He moved "
        "toward you first.",
    ),
    (
        5,
        'What is Faith?',
        'Hebrews 11:1',
        'Now faith is confidence in what we hope for and assurance about what we do not see.\n\n'
        'Faith is not pretending you have no doubts. It is choosing to trust God with what you '
        "cannot yet fully see or understand, the same way you'd trust a friend who has proven "
        "faithful before. It grows the more you exercise it.",
    ),
]


async def seed() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with SessionLocal() as db:
        existing = await db.scalar(select(Course).where(Course.slug == 'foundations-of-faith'))
        if existing is not None:
            print('Foundations of Faith already seeded, skipping.')
            return

        course = Course(
            slug='foundations-of-faith',
            title='Foundations of Faith',
            description='A short journey through the basics of following Christ.',
        )
        db.add(course)
        await db.flush()

        for day, title, reference, body in FOUNDATIONS_LESSONS:
            db.add(
                Lesson(
                    course_id=course.id,
                    day=day,
                    title=title,
                    scripture_reference=reference,
                    body=body,
                )
            )

        await db.commit()
        print('Seeded Foundations of Faith course.')


if __name__ == '__main__':
    asyncio.run(seed())
