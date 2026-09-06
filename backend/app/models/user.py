import uuid
from datetime import datetime

from sqlalchemy import ARRAY, Boolean, DateTime, ForeignKey, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class User(Base):
    __tablename__ = 'users'

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(120))
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    profile: Mapped['SpiritualProfile | None'] = relationship(
        back_populates='user', uselist=False, lazy='selectin'
    )


class SpiritualProfile(Base):
    __tablename__ = 'spiritual_profiles'

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey('users.id'), unique=True)
    stage: Mapped[str] = mapped_column(String(30), default='new_believer')
    interests: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    notifications_enabled: Mapped[bool] = mapped_column(Boolean, default=True)

    user: Mapped['User'] = relationship(back_populates='profile')
