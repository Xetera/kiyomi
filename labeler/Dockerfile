FROM node:14-slim AS build

WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

WORKDIR /opt/app/labeler
# tensorflow needs these binaries
RUN apt-get update && \
    apt-get install -y build-essential \
    wget \
    python3 \
    make \
    gcc \
    libc6-dev \
    libssl-dev

RUN yarn global add ts-node typescript
COPY labeler/package.json labeler/yarn.lock ./
RUN yarn --frozen-lockfile
COPY shared /opt/app/shared
COPY labeler/tsconfig.json tsconfig.json
COPY labeler/src src
RUN yarn typecheck
RUN yarn build
RUN yarn tf

FROM nikolaik/python-nodejs:python3.8-nodejs14-slim
RUN apt update && apt-get install -y --no-install-recommends libssl-dev build-essential && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/app/labeler

ENV NODE_ENV=production

COPY labeler/requirements.txt requirements.txt
COPY labeler/package.json labeler/yarn.lock ./
RUN yarn --production --frozen-lockfile
RUN pip3 install -r requirements.txt
RUN apt autoremove
COPY --from=build /opt/app/labeler/dist dist
COPY labeler/*.py ./
# Rebuilding tensorflow dependencies for some reason because it causes weird bugs without it???

COPY labeler/weights weights

RUN yarn tf

CMD ["node", "--enable-source-maps", "./dist/labeler/src/index.js"]
