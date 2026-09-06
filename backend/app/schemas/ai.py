import uuid

from pydantic import BaseModel

from app.schemas.base import CamelModel


class AskRequest(BaseModel):
    question: str
    conversation_id: uuid.UUID | None = None


class ExplainVerseRequest(BaseModel):
    translation: str
    book: str
    chapter: int
    verse: int


class AiReference(CamelModel):
    reference: str
    text: str


class AiResponse(CamelModel):
    answer: str
    references: list[AiReference]
    related_reading: list[str]
