from datetime import datetime, timedelta, timezone

from fastapi import FastAPI
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.crud import get_future_launches_sorted
from app.models import FavouriteLaunch, Launch, User
from app.redis import RedisClient
from app.settings import settings

from .email_builder import EmailBuilder
from .smtp_client import SMTPClient


class LaunchEmailNotifier:
    def __init__(
        self,
        app: FastAPI,
        db_session: AsyncSession,
        redis_client: RedisClient,
        email_sender=SMTPClient(),
    ):
        """
        Initialize the notifier.

        :param db_session: SQLAlchemy session for database queries.
        :param email_sender: Function or object for sending emails (e.g., SMTP client).
        """
        self.app = app
        self.db_session = db_session
        self.email_sender = email_sender
        self.redis_client = redis_client

    async def send_notifications(
        self, time_delta: timedelta = timedelta(hours=1)
    ):
        """
        Send email notifications for launches happening within the given time delta.

        :param time_delta: Time delta before the launch to send notifications.
        """
        now = datetime.now(timezone.utc)

        upcoming_launches = await get_future_launches_sorted(
            self.db_session, self.redis_client
        )

        for launch in upcoming_launches:
            result = await self.db_session.execute(
                select(User)
                .join(FavouriteLaunch, FavouriteLaunch.user_id == User.id)
                .filter(FavouriteLaunch.launch_id == launch.id)
            )
            users = result.scalars().all()

            for user in users:
                self._send_email(user, launch)

    def _send_email(self, recipient: User, launch: Launch):
        """
        Send an email about a specific launch.

        :param recipient_email: The email address of the recipient.
        :param launch: The Launch object containing launch details.
        """
        subject, body = EmailBuilder.build_launch_email(
            recipient=recipient, launch=launch
        )
        print(recipient.email, subject, body)

        # self.email_sender.send_email(to=recipient.email, subject=subject, body=body)
