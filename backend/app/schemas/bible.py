from pydantic import BaseModel

from app.schemas.base import CamelModel


class TranslationOut(BaseModel):
    id: str
    name: str
    language: str


class BookOut(CamelModel):
    id: str
    name: str
    number_of_chapters: int


class SearchResult(CamelModel):
    book: str
    book_name: str
    chapter: int
    verse: int
    text: str


class VerseOut(BaseModel):
    number: int
    text: str


class ChapterOut(BaseModel):
    translation: str
    book: str
    chapter: int
    verses: list[VerseOut]
