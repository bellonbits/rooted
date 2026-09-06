from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', extra='ignore')

    database_url: str = 'postgresql+asyncpg://rooted:rooted@localhost:5432/rooted'

    jwt_secret: str = 'change-me'
    jwt_algorithm: str = 'HS256'
    access_token_expire_minutes: int = 10080

    bible_api_base_url: str = 'https://bible.helloao.org/api'
    default_bible_translation: str = 'BSB'

    llm_api_key: str = ''
    llm_model: str = 'llama-3.3-70b-versatile'
    llm_base_url: str = 'https://api.groq.com/openai/v1'

    cors_origins: str = 'http://localhost:5173'

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(',') if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
