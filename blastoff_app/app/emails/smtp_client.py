from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from aiosmtplib import SMTP

from app.settings import settings

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL = "blastoff2137@gmail.com"
PASSWORD = settings.smtp_password


class SMTPClient:
    def __init__(
        self,
        smtp_server=SMTP_SERVER,
        smtp_port=SMTP_PORT,
        email=EMAIL,
        password=PASSWORD,
    ):
        """
        Initialize the SMTP client.

        :param smtp_server: SMTP server address.
        :param smtp_port: SMTP server port.
        :param email: Sender's email address.
        :param password: Sender's email password.
        """
        self.smtp_server = smtp_server
        self.smtp_port = smtp_port
        self.email = email
        self.password = password

    async def send_email(self, to, subject, body):
        """
        Send an email asynchronously.

        :param to: Recipient's email address.
        :param subject: Subject of the email.
        :param body: HTML body of the email.
        """
        message = MIMEMultipart()
        message["From"] = self.email
        message["To"] = to
        message["Subject"] = subject
        message.attach(MIMEText(body, "html"))

        try:
            async with SMTP(
                hostname=self.smtp_server, port=self.smtp_port
            ) as client:
                await client.login(self.email, self.password)
                await client.send_message(message)
                print(f"Email sent successfully to {to}!")
        except Exception as e:
            print(f"Failed to send email to {to}: {e}")
