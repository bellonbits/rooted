import asyncio

import httpx

from app.core.config import get_settings
from app.schemas.bible import BookOut, ChapterOut, SearchResult, TranslationOut, VerseOut

settings = get_settings()


class BibleService:
    """Wraps the HelloAO Free Use Bible API (https://bible.helloao.org).

    Kept behind our own API so the frontend never talks to a third-party
    Bible provider directly - we can add caching, cross-references or swap
    providers later without touching the frontend.
    """

    def __init__(self, base_url: str = settings.bible_api_base_url) -> None:
        self._base_url = base_url
        # In-process cache of the full, flattened verse text per translation,
        # used for keyword search. HelloAO has no search endpoint of its own,
        # and downloading the ~8MB complete translation on every search would
        # be slow and unkind to their API - so each translation is fetched
        # and flattened once per server process.
        self._search_cache: dict[str, list[dict]] = {}
        self._search_locks: dict[str, asyncio.Lock] = {}

    async def list_translations(self) -> list[TranslationOut]:
        async with httpx.AsyncClient(base_url=self._base_url, timeout=10) as client:
            response = await client.get('/available_translations.json')
            response.raise_for_status()
            payload = response.json()

        return [
            TranslationOut(
                id=t['id'],
                name=t.get('englishName') or t.get('name', t['id']),
                language=t.get('languageName') or t.get('language', ''),
            )
            for t in payload.get('translations', [])
        ]

    async def list_books(self, translation: str) -> list[BookOut]:
        async with httpx.AsyncClient(base_url=self._base_url, timeout=10) as client:
            response = await client.get(f'/{translation}/books.json')
            response.raise_for_status()
            payload = response.json()

        return [
            BookOut(id=b['id'], name=b.get('commonName', b['name']), number_of_chapters=b['numberOfChapters'])
            for b in payload.get('books', [])
        ]

    async def get_chapter(self, translation: str, book: str, chapter: int) -> ChapterOut:
        async with httpx.AsyncClient(base_url=self._base_url, timeout=10) as client:
            response = await client.get(f'/{translation}/{book}/{chapter}.simple.json')
            response.raise_for_status()
            payload = response.json()

        content = payload.get('chapter', {}).get('content', [])
        verses = [
            VerseOut(number=item['number'], text=item['text'])
            for item in content
            if item.get('type') == 'verse'
        ]
        return ChapterOut(translation=translation, book=book, chapter=chapter, verses=verses)

    async def search(self, translation: str, query: str, limit: int = 50) -> list[SearchResult]:
        verses = await self._get_flattened_translation(translation)
        needle = query.strip().lower()
        if not needle:
            return []

        results = [v for v in verses if needle in v['text'].lower()]
        return [SearchResult(**v) for v in results[:limit]]

    async def _get_flattened_translation(self, translation: str) -> list[dict]:
        if translation in self._search_cache:
            return self._search_cache[translation]

        lock = self._search_locks.setdefault(translation, asyncio.Lock())
        async with lock:
            if translation in self._search_cache:
                return self._search_cache[translation]

            async with httpx.AsyncClient(base_url=self._base_url, timeout=30) as client:
                response = await client.get(f'/{translation}/complete.simple.json')
                response.raise_for_status()
                payload = response.json()

            flattened: list[dict] = []
            for book in payload.get('books', []):
                book_id = book['id']
                book_name = book.get('commonName', book.get('name', book_id))
                for chapter_wrapper in book.get('chapters', []):
                    chapter = chapter_wrapper.get('chapter', {})
                    chapter_number = chapter.get('number')
                    for item in chapter.get('content', []):
                        if item.get('type') == 'verse':
                            flattened.append(
                                {
                                    'book': book_id,
                                    'book_name': book_name,
                                    'chapter': chapter_number,
                                    'verse': item['number'],
                                    'text': item['text'],
                                }
                            )

            self._search_cache[translation] = flattened
            return flattened


bible_service = BibleService()
