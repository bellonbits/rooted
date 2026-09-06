import uuid

from pydantic import BaseModel, EmailStr, Field

from app.schemas.base import CamelModel


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str = Field(min_length=8, max_length=72)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserProfileOut(CamelModel):
    id: uuid.UUID
    name: str
    email: EmailStr
    spiritual_stage: str
    interests: list[str]
    notifications_enabled: bool


class UserProfileUpdate(CamelModel):
    spiritual_stage: str | None = None
    interests: list[str] | None = None
    notifications_enabled: bool | None = None


class TokenOut(BaseModel):
    access_token: str
    token_type: str = 'bearer'
