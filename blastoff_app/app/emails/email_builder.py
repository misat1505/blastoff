from app.models import Launch, User
from app.settings import settings


class EmailBuilder:
    """
    A class for constructing email content for launch notifications.
    """
    @staticmethod
    def build_email(recipient: User, launch: Launch) -> tuple[str, str]:
        """
        A method to build email title and body

        Attributes:
            recipient (User): User to who the email is sent.
            launch (Launch): Launch about which the user gets notified.

        Returns:
            title and body
        """
        subject = f"Upcoming Launch: {launch.mission_name}"
        body = f"""
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                    color: #333;
                }}
                .container {{
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }}
                h1 {{
                    color: #4CAF50;
                    font-size: 24px;
                }}
                p {{
                    font-size: 16px;
                    line-height: 1.5;
                    margin-bottom: 16px;
                }}
                .launch-details {{
                    background-color: #f9f9f9;
                    border-radius: 5px;
                    padding: 15px;
                    margin-bottom: 20px;
                }}
                .launch-details p {{
                    margin: 8px 0;
                }}
                .cta-button {{
                    background-color: #4CAF50;
                    color: white;
                    text-decoration: none;
                    padding: 12px 20px;
                    border-radius: 4px;
                    display: inline-block;
                    margin-top: 20px;
                    font-weight: bold;
                }}
                .footer {{
                    font-size: 12px;
                    color: #888;
                    text-align: center;
                    margin-top: 30px;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Upcoming Launch: {launch.mission_name}</h1>
                <p>Hello {recipient.username},</p>
                <p>A launch is scheduled soon:</p>
                
                <div class="launch-details">
                    <p><strong>Mission Name:</strong> {launch.mission_name}</p>
                    <p><strong>Date:</strong> {launch.date}</p>
                    <p><strong>Description:</strong> {launch.description}</p>
                    <img style="width: 100%" src="{launch.image_url}" alt="{launch.mission_name} logo" />
                </div>

                <p>For more details, click the button below:</p>
                <a href="{settings.frontend_url}/launches/{launch.id}" class="cta-button">View Launch Details</a>

                <div class="footer">
                    <p>If you no longer wish to receive these notifications, you can unsubscribe at any time.</p>
                </div>
            </div>
        </body>
        </html>
        """

        return subject, body
