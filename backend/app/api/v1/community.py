import uuid

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import get_current_user
from app.db.session import get_db
from app.models.community import Post, Reply
from app.models.user import User
from app.schemas.community import PostCreate, PostOut, ReplyCreate, ReplyOut

router = APIRouter(prefix='/community', tags=['community'])


@router.get('', response_model=list[PostOut])
async def list_posts(db: AsyncSession = Depends(get_db)) -> list[Post]:
    result = await db.scalars(select(Post).order_by(Post.created_at.desc()))
    return list(result.all())


@router.post('', response_model=PostOut, status_code=201)
async def create_post(
    payload: PostCreate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> Post:
    post = Post(author_id=user.id, **payload.model_dump())
    db.add(post)
    await db.commit()
    await db.refresh(post, attribute_names=['author', 'replies'])
    return post


@router.get('/{post_id}', response_model=PostOut)
async def get_post(post_id: uuid.UUID, db: AsyncSession = Depends(get_db)) -> Post:
    post = await db.get(Post, post_id)
    if post is None:
        raise HTTPException(status_code=404, detail='Post not found')
    return post


@router.post('/{post_id}/replies', response_model=ReplyOut, status_code=201)
async def create_reply(
    post_id: uuid.UUID,
    payload: ReplyCreate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> Reply:
    post = await db.get(Post, post_id)
    if post is None:
        raise HTTPException(status_code=404, detail='Post not found')

    reply = Reply(post_id=post_id, author_id=user.id, **payload.model_dump())
    db.add(reply)
    await db.commit()
    await db.refresh(reply, attribute_names=['author'])
    return reply
