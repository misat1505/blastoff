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
    """
    A class to schedule and send email notifications about upcoming launches.

    This class handles scheduling email notifications to users based on the
    launch date, sending notifications before the launch, and managing the
    Redis cache for future launches.
    """

    def __init__(
        self,
        app: FastAPI,
        db_session: AsyncSession,
        redis_client: RedisClient,
        email_sender=SMTPClient(),
    ):
        """
        Initialize the notifier.

        Attributes:
            app (FastAPI): FastAPI app object.
            db_session (AsyncSession): SQLAlechemy session.
            redis_client (RedisClient): redis client.
            email_sender (SMTPClient): smtp client.
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
        Schedule email notifications. Send them time_delta prior to launch.
        Invalidate redis cache.

        Attributes:
            time_delta: (timedelta): Time delta before the launch to send notifications.
        """
        await self.redis_client.flush_all()

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

        Attributes:
            send_time (timdelta): The time to send the email.
            launch (Launch): The launch object containing launch details.
        """
        trigger = DateTrigger(run_date=send_time)
        self.scheduler.add_job(
            self._send_email_job,
            trigger,
            args=[launch],
            id=f"email_{launch.id}",
            replace_existing=True,
        )

    async def _send_email_job(self, launch: Launch):
        """
        Job to send an email when the scheduled time arrives.

        Attributes:
            launch (Launch): The Launch object containing launch details.
        """
        users = await self._get_users_for_emails(launch)

        for user in users:
            await self._send_email(user, launch)

    async def _get_users_for_emails(self, launch: Launch) -> list[User]:
        """
        Get list of users who follow launch or it's agency.

        Attributes:
            launch (Launch)
        """

        async with self.db_session.begin():
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

    async def _send_email(self, recipient: User, launch: Launch):
        """
        Send an email about a specific launch.

        Attributes:
            recipient (User): The user to send the email to.
            launch (Launch): The Launch object containing launch details.
        """
        subject, body = EmailBuilder.build_email(
            recipient=recipient, launch=launch
        )

        await self.email_sender.send_email(
            to=recipient.email, subject=subject, body=body
        )
