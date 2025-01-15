from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from aiosmtplib import SMTP

from app.settings import settings

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL = "blastoff2137@gmail.com"
PASSWORD = settings.smtp_password


class SMTPClient:
    """
    A client for sending emails using an SMTP server.
    """
    def __init__(
        self,
        smtp_server=SMTP_SERVER,
        smtp_port=SMTP_PORT,
        email=EMAIL,
        password=PASSWORD,
    ):
        """
        Initialize the SMTP client.

        Attributes:
            smtp_server (str): SMTP server address.
            smtp_port (int): SMTP server port.
            email (str): Sender's email address.
            password (str): Sender's email password.
        """
        self.smtp_server = smtp_server
        self.smtp_port = smtp_port
        self.email = email
        self.password = password

    async def send_email(self, to: str, subject: str, body: str):
        """
        Send an email asynchronously.

        Attributes:
            to (str): Recipient's email address.
            subject (str): Subject of the email.
            body (str): HTML body of the email.
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
