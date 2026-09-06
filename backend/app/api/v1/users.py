from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.user import UserProfileOut, UserProfileUpdate

router = APIRouter(prefix='/users', tags=['users'])


@router.get('/me', response_model=UserProfileOut)
async def get_me(user: User = Depends(get_current_user)) -> UserProfileOut:
    return UserProfileOut(
        id=user.id,
        name=user.name,
        email=user.email,
        spiritual_stage=user.profile.stage if user.profile else 'new_believer',
        interests=user.profile.interests if user.profile else [],
        notifications_enabled=user.profile.notifications_enabled if user.profile else True,
    )


@router.patch('/me', response_model=UserProfileOut)
async def update_me(
    updates: UserProfileUpdate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> UserProfileOut:
    profile = user.profile
    if profile is not None:
        if updates.spiritual_stage is not None:
            profile.stage = updates.spiritual_stage
        if updates.interests is not None:
            profile.interests = updates.interests
        if updates.notifications_enabled is not None:
            profile.notifications_enabled = updates.notifications_enabled
        await db.commit()
        await db.refresh(profile)

    return UserProfileOut(
        id=user.id,
        name=user.name,
        email=user.email,
        spiritual_stage=profile.stage if profile else 'new_believer',
        interests=profile.interests if profile else [],
        notifications_enabled=profile.notifications_enabled if profile else True,
    )
