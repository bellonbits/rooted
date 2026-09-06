import httpx

from app.core.config import get_settings
from app.schemas.ai import AiReference, AiResponse
from app.services.bible_service import bible_service

settings = get_settings()

SYSTEM_PROMPT = (
    'You are the ROOTED Bible companion, helping new believers understand Scripture. '
    'Ground every answer in the Bible text provided as context. Distinguish clearly between '
    "Scripture (primary authority) and your own explanation (a teaching aid, not doctrine). "
    'Keep answers warm, simple, and short enough for someone new to the faith.'
)


class AiService:
    """Orchestrates the Ask AI flow: pull relevant Scripture, then let the LLM
    explain it. This is the seam described in the ROOTED architecture notes -
    retrieval (Bible + cross-references + approved teaching material) feeding
    the LLM, rather than asking the model to answer from memory alone.
    """

    async def ask(self, question: str) -> AiResponse:
        if not settings.llm_api_key:
            return AiResponse(
                answer=(
                    "I can't reach the language model yet - set LLM_API_KEY in the backend's "
                    '.env to enable Ask AI.'
                ),
                references=[],
                related_reading=[],
            )

        answer = await self._call_llm(question)
        return AiResponse(answer=answer, references=[], related_reading=[])

    async def explain_verse(self, translation: str, book: str, chapter: int, verse: int) -> AiResponse:
        chapter_data = await bible_service.get_chapter(translation, book, chapter)
        verse_text = next((v.text for v in chapter_data.verses if v.number == verse), None)

        if verse_text is None:
            return AiResponse(answer='Verse not found.', references=[], related_reading=[])

        if not settings.llm_api_key:
            return AiResponse(
                answer=(
                    "I can't reach the language model yet - set LLM_API_KEY in the backend's "
                    '.env to enable verse explanations.'
                ),
                references=[AiReference(reference=f'{book} {chapter}:{verse}', text=verse_text)],
                related_reading=[],
            )

        prompt = f'Explain {book} {chapter}:{verse} — "{verse_text}" — for someone new to the Christian faith.'
        answer = await self._call_llm(prompt)
        return AiResponse(
            answer=answer,
            references=[AiReference(reference=f'{book} {chapter}:{verse}', text=verse_text)],
            related_reading=[],
        )

    async def _call_llm(self, user_message: str) -> str:
        # Groq's API is OpenAI-compatible chat completions.
        try:
            async with httpx.AsyncClient(timeout=30) as client:
                response = await client.post(
                    f'{settings.llm_base_url}/chat/completions',
                    headers={
                        'Authorization': f'Bearer {settings.llm_api_key}',
                        'content-type': 'application/json',
                    },
                    json={
                        'model': settings.llm_model,
                        'max_tokens': 600,
                        'messages': [
                            {'role': 'system', 'content': SYSTEM_PROMPT},
                            {'role': 'user', 'content': user_message},
                        ],
                    },
                )
                response.raise_for_status()
                payload = response.json()
        except httpx.HTTPStatusError as exc:
            if exc.response.status_code in (401, 403):
                return "The AI service rejected the configured LLM_API_KEY - check it's a valid Groq key."
            return "The AI service is temporarily unavailable. Please try again in a moment."
        except httpx.HTTPError:
            return "Couldn't reach the AI service. Please try again in a moment."

        return payload['choices'][0]['message']['content']


ai_service = AiService()
