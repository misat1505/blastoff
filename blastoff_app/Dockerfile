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

ENV DATABASE_URL=mysql+aiomysql://root:@database/blastoff_db
ENV JWT_SECRET=oiugauygeuygyfufh732f23ft31f69732f1gf967gc708tf
ENV FRONTEND_URL=http://localhost:3000
CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

