FROM ghcr.io/astral-sh/uv:python3.13-bookworm-slim AS builder

ENV UV_COMPILE_BYTECODE=1 UV_LINK_MODE=copy

WORKDIR /app

RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --frozen --no-install-project --no-dev
    

ADD . /app

RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-dev

FROM builder AS development

COPY --from=builder --chown=app:app /app /app

# To install remaining dev dependencies
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen
    
EXPOSE 5000
    
CMD ["uv", "run", "flask", "run", "--host", "0.0.0.0"]

FROM python:3.13-slim-bookworm AS production

COPY --from=builder --chown=app:app /app /app

ENV PATH="/app/.venv/bin:$PATH"
ENV FLASK_APP=/app/app.py

EXPOSE 5000

CMD ["python3", "-m", "flask", "run", "--host", "0.0.0.0"]
#CMD ["python3", "-m", "gunicorn", "app.app:app", "--bind", "0.0.0.0:5000"]
