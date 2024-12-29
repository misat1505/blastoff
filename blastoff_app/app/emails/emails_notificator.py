from datetime import datetime, timedelta

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.date import DateTrigger
from fastapi import FastAPI
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.crud import get_future_launches_sorted
from app.models import FavouriteAgency, FavouriteLaunch, Launch, User
from app.redis import RedisClient

from .email_builder import EmailBuilder
from .smtp_client import SMTPClient


class EmailNotifier:
    def __init__(
        self,
        app: FastAPI,
        db_session: AsyncSession,
        redis_client: RedisClient,
        email_sender=SMTPClient(),
    ):
        """
        Initialize the notifier.

        :param app: FastAPI for scheduling tasks.
        :param db_session: SQLAlchemy session for database queries.
        :param redis_client: RedisClient for handling redis cache.
        :param email_sender: SMTPClient for sending emails.
        """
        self.app = app
        self.db_session = db_session
        self.email_sender = email_sender
        self.redis_client = redis_client

        self.scheduler = AsyncIOScheduler()
        self.scheduler.start()

    async def schedule_notifications(
        self, time_delta: timedelta = timedelta(hours=1)
    ):
        """
        Send email notifications for launches happening within the given time delta.

        :param time_delta: Time delta before the launch to send notifications.
        """

        upcoming_launches = await get_future_launches_sorted(
            self.db_session, self.redis_client
        )

        for launch in upcoming_launches:
            launch_time = launch.date
            send_time = launch_time - time_delta
            self._schedule_email_send(send_time, launch)

    def _schedule_email_send(self, send_time: datetime, launch: Launch):
        """
        Schedules the email to be sent at the specified send time.

        :param send_time: The time to send the email.
        :param launch: The launch object containing launch details.
        """
        trigger = DateTrigger(run_date=send_time)
        self.scheduler.add_job(
            self._send_email_job,
            trigger,
            args=[launch],
            id=f"launch_email_{launch.id}",
            replace_existing=True,
        )

    async def _send_email_job(self, launch: Launch):
        """
        Job to send an email when the scheduled time arrives.

        :param launch: The Launch object containing launch details.
        """
        users = await self._get_users_for_emails(launch)

        for user in users:
            self._send_email(user, launch)

    async def _get_users_for_emails(self, launch: Launch) -> list[User]:
        fav_launch_result = await self.db_session.execute(
            select(User)
            .join(FavouriteLaunch, FavouriteLaunch.user_id == User.id)
            .filter(FavouriteLaunch.launch_id == launch.id)
        )
        fav_launch_users = fav_launch_result.scalars().all()

        fav_agency_result = await self.db_session.execute(
            select(User)
            .join(FavouriteAgency, FavouriteAgency.user_id == User.id)
            .filter(FavouriteAgency.agency_id == launch.rocket.agency.id)
        )
        fav_agency_users = fav_agency_result.scalars().all()

        users = fav_launch_users + fav_agency_users

        return list({user.id: user for user in users}.values())

    def _send_email(self, recipient: User, launch: Launch):
        """
        Send an email about a specific launch.

        :param recipient: The user to send the email to.
        :param launch: The Launch object containing launch details.
        """
        subject, body = EmailBuilder.build_email(
            recipient=recipient, launch=launch
        )

        self.email_sender.send_email(
            to=recipient.email, subject=subject, body=body
        )
