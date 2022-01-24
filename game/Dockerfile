FROM node:16-slim AS build

WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

WORKDIR /opt/app/game
# tensorflow needs these binaries
RUN apt-get update && \
    apt-get install -y build-essential \
    python3 \
    make \
    libc6-dev \
    libssl-dev

RUN yarn global add ts-node typescript
COPY game/package.json game/yarn.lock ./
RUN yarn --frozen-lockfile
COPY shared /opt/app/shared
COPY game/tsconfig.json tsconfig.json
COPY game/src src
RUN yarn typecheck
RUN yarn build

FROM node:16-alpine as release

WORKDIR /opt/app/game

ENV NODE_ENV=production

COPY game/package.json game/yarn.lock ./
RUN yarn --production --frozen-lockfile
COPY --from=build /opt/app/game/dist dist

CMD ["node", "--async-stack-traces", "--enable-source-maps", "./dist/game/src/index.js"]

