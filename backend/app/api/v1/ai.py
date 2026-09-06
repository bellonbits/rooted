from fastapi import APIRouter

from app.schemas.ai import AskRequest, ExplainVerseRequest, AiResponse
from app.services.ai_service import ai_service

router = APIRouter(prefix='/ai', tags=['ai'])

# Not behind auth: neither endpoint persists anything (no conversation
# history is saved), so there's no "progress" a guest would lose by using
# them - unlike journal/prayer/lesson-completion, which are gated.


@router.post('/ask', response_model=AiResponse)
async def ask(payload: AskRequest) -> AiResponse:
    return await ai_service.ask(payload.question)


@router.post('/explain-verse', response_model=AiResponse)
async def explain_verse(payload: ExplainVerseRequest) -> AiResponse:
    return await ai_service.explain_verse(payload.translation, payload.book, payload.chapter, payload.verse)
