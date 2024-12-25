ARG PYTHON_BASE=3.12

FROM python:$PYTHON_BASE AS builder

RUN pip install -U pdm

ENV PDM_CHECK_UPDATE=false
COPY pyproject.toml pdm.lock README.md /project/
COPY app/ /project/app

WORKDIR /project
RUN pdm install --check --prod --no-editable

FROM python:$PYTHON_BASE

# retrieve packages from build stage
COPY --from=builder /project/.venv/ /project/.venv
ENV PATH="/project/.venv/bin:$PATH"

COPY app /project/app/
WORKDIR /project
EXPOSE 8000

ENV DATABASE_URL=postgresql+asyncpg://postgres:postgres@database/blastoff_db
ENV JWT_SECRET=oiugauygeuygyfufh732f23ft31f69732f1gf967gc708tf
ENV FRONTEND_URL=http://localhost:3000
ENV SENTRY_DSN=https://9ba665eba857ce6c337cb7a2b77a7096@o4508512973225984.ingest.de.sentry.io/4508512974798928
ENV REDIS_URI=redis://redis

CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
