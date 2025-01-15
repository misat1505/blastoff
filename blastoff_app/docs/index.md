# ZPRP - Documentation

FastAPI-based application designed for tracking upcoming rocket launches. The application provides users with detailed information about upcoming launches, using data from an external [API](https://ll.thespacedevs.com/).

### Features

1.  **Database Integration**:

    1. PostgreSQL is used to store launches, rockets, users, and other data.
    2. Redis is used for caching the most frequently accessed endpoints.

2.  **Email Notifications**:

    1. The application can send email notifications to keep users informed about updates or changes to rocket launch schedules.

3.  **API Communication**:

    1. The app interacts with a third-party [API](https://ll.thespacedevs.com/) to fetch real-time rocket launch data.
