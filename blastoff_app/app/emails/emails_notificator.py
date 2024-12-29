from datetime import datetime, timedelta, timezone

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.crud import get_future_launches_sorted
from app.models import FavouriteAgency, Launch, User
from app.redis import RedisClient
from app.settings import settings

from .smtp_client import SMTPClient


class LaunchEmailNotifier:
    def __init__(
        self,
        db_session: AsyncSession,
        redis_client: RedisClient,
        email_sender=SMTPClient(),
    ):
        """
        Initialize the notifier.

        :param db_session: SQLAlchemy session for database queries.
        :param email_sender: Function or object for sending emails (e.g., SMTP client).
        """
        self.db_session = db_session
        self.email_sender = email_sender
        self.redis_client = redis_client

    async def send_notifications(self, time_delta: timedelta):
        """
        Send email notifications for launches happening within the given time delta.

        :param time_delta: Time delta before the launch to send notifications.
        """
        now = datetime.now(timezone.utc)

        upcoming_launches = await get_future_launches_sorted(
            self.db_session, self.redis_client
        )

        for launch in upcoming_launches:
            agency = launch.rocket.agency
            result = await self.db_session.execute(
                select(User)
                .join(FavouriteAgency, FavouriteAgency.user_id == User.id)
                .filter(FavouriteAgency.agency_id == agency.id)
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
        subject = f"Upcoming Launch: {launch.mission_name}"
        body = (
            f"Hello {recipient.username},\n\n"
            f"A launch is scheduled soon:\n"
            f"Mission Name: {launch.mission_name}\n"
            f"Date: {launch.date}\n"
            f"Description: {launch.description}\n\n"
            f"Visit {settings.frontend_url}/launches/{launch.id} for more details."
        )
        print(recipient.email, subject, body)

        # self.email_sender.send_email(to=recipient.email, subject=subject, body=body)
