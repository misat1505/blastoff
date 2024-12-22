import os

from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.environ["DATABASE_URL"]
JWT_SECRET = os.environ["JWT_SECRET"]
FRONTEND_URL = os.environ["FRONTEND_URL"]
SENTRY_DSN = os.environ["SENTRY_DSN"]
