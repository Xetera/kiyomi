## syntax=docker/dockerfile:1.3
#FROM python:3.8 as build
#
#ENV PIP_NO_CACHE_DIR=1
#
#WORKDIR /app/labeler
#
#RUN --mount=type=cache,target=/var/cache/apt \
#  apt update && apt-get install -y gcc build-essential cmake pkg-config libx11-dev libatlas-base-dev libgtk-3-dev libboost-python-dev cmake libtool autoconf
#
#RUN pip install "poetry==1.1.12"
#RUN python -m venv /venv
#ENV VIRTUAL_ENV=/venv
#ENV PATH="$VIRTUAL_ENV/bin:$PATH"
#
#WORKDIR /app
#
#RUN touch /app/labeler/empty.py
#COPY ["pyproject.toml", "poetry.lock", "/app/"]
#RUN poetry config virtualenvs.in-project true && poetry install
#COPY [".", "/app"]
#
#FROM python:3.8-alpine as final
#ENV PATH="/app/.venv/bin:$PATH"
#WORKDIR /app
#
#COPY --from=build /app /app
#
#CMD ["poetry", "run", "celery", "-A", "labeler.main", "worker"]

# `python-base` sets up all our shared environment variables
FROM python:3.8 as python-base

    # python
ENV PYTHONUNBUFFERED=1 \
    # prevents python creating .pyc files
    PYTHONDONTWRITEBYTECODE=1 \
    \
    # pip
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    \
    # poetry
    # https://python-poetry.org/docs/configuration/#using-environment-variables
    POETRY_VERSION=1.1.12 \
    # make poetry install to this location
    POETRY_HOME="/opt/poetry" \
    # make poetry create the virtual environment in the project's root
    # it gets named `.venv`
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    # do not ask any interactive question
    POETRY_NO_INTERACTION=1 \
    \
    # paths
    # this is where our requirements + virtual environment will live
    PYSETUP_PATH="/opt/pysetup" \
    VENV_PATH="/opt/pysetup/.venv"


# prepend poetry and venv to path
ENV PATH="$POETRY_HOME/bin:$VENV_PATH/bin:$PATH"


# `builder-base` stage is used to build deps + create our virtual environment
FROM python-base as builder-base
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        # deps for installing poetry
        curl \
        # deps for building python deps
        build-essential gcc build-essential cmake pkg-config libx11-dev libatlas-base-dev libgtk-3-dev libboost-python-dev cmake libtool autoconf

# install poetry - respects $POETRY_VERSION & $POETRY_HOME
RUN curl -sSL https://raw.githubusercontent.com/sdispater/poetry/master/get-poetry.py | python

# copy project requirement files here to ensure they will be cached.
WORKDIR $PYSETUP_PATH
COPY poetry.lock pyproject.toml ./

# install runtime deps - uses $POETRY_VIRTUALENVS_IN_PROJECT internally
COPY poetry.lock /
RUN --mount=type=cache,target=/home/.cache/pypoetry/cache \
    --mount=type=cache,target=/home/.cache/pypoetry/artifacts \
    poetry install

# `production` image used for runtime
FROM python-base as production

RUN pip3 install opencv-contrib-python
RUN apt update && apt-get install -y libatlas-base-dev libhdf5-dev libhdf5-serial-dev libatlas-base-dev
COPY --from=builder-base $PYSETUP_PATH $PYSETUP_PATH
COPY . /app/
WORKDIR /app
# Set user and group
ARG user=worker
ARG group=worker
ARG uid=1000
ARG gid=1000
RUN groupadd -g ${gid} ${group}
RUN useradd -u ${uid} -g ${group} -s /bin/sh -m ${user} # <--- the '-m' create a user home directory

# Switch to user
USER ${uid}:${gid}

CMD ["celery", "-A", "labeler.main", "worker"]
