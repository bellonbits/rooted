from fastapi import APIRouter, Query

from app.schemas.bible import BookOut, ChapterOut, SearchResult, TranslationOut
from app.services.bible_service import bible_service

router = APIRouter(prefix='/bible', tags=['bible'])


@router.get('/translations', response_model=list[TranslationOut])
async def list_translations() -> list[TranslationOut]:
    return await bible_service.list_translations()


@router.get('/{translation}/books', response_model=list[BookOut])
async def list_books(translation: str) -> list[BookOut]:
    return await bible_service.list_books(translation)


@router.get('/{translation}/search', response_model=list[SearchResult])
async def search(translation: str, q: str = Query(min_length=2)) -> list[SearchResult]:
    return await bible_service.search(translation, q)


@router.get('/{translation}/{book}/{chapter}', response_model=ChapterOut)
async def get_chapter(translation: str, book: str, chapter: int) -> ChapterOut:
    return await bible_service.get_chapter(translation, book, chapter)
