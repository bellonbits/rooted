import uuid
from datetime import datetime

from app.schemas.base import CamelModel


class AuthorOut(CamelModel):
    id: uuid.UUID
    name: str


class ReplyCreate(CamelModel):
    body: str


class ReplyOut(ReplyCreate):
    id: uuid.UUID
    created_at: datetime
    author: AuthorOut


class PostCreate(CamelModel):
    title: str
    body: str = ''
    category: str = 'General'


class PostOut(PostCreate):
    id: uuid.UUID
    created_at: datetime
    author: AuthorOut
    replies: list[ReplyOut] = []
