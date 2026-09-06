from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import create_access_token, hash_password, verify_password
from app.db.session import get_db
from app.models.user import SpiritualProfile, User
from app.schemas.user import TokenOut, UserCreate, UserLogin

router = APIRouter(prefix='/auth', tags=['auth'])


@router.post('/register', response_model=TokenOut, status_code=status.HTTP_201_CREATED)
async def register(payload: UserCreate, db: AsyncSession = Depends(get_db)) -> TokenOut:
    existing = await db.scalar(select(User).where(User.email == payload.email))
    if existing is not None:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, 'Email already registered')

    user = User(name=payload.name, email=payload.email, password_hash=hash_password(payload.password))
    db.add(user)
    await db.flush()
    db.add(SpiritualProfile(user_id=user.id))
    await db.commit()

    return TokenOut(access_token=create_access_token(str(user.id)))


@router.post('/login', response_model=TokenOut)
async def login(payload: UserLogin, db: AsyncSession = Depends(get_db)) -> TokenOut:
    user = await db.scalar(select(User).where(User.email == payload.email))
    if user is None or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, 'Incorrect email or password')

    return TokenOut(access_token=create_access_token(str(user.id)))
