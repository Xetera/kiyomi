# Install dependencies only when needed
### build
FROM node:16-alpine AS build

ARG TYPESENSE_KEY
ARG TYPESENSE_URL
ARG DISCORD_INVITE_URL
ARG GRAPHQL_API

WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

WORKDIR /opt/app/client

COPY client/package.json client/yarn.lock ./
RUN yarn --frozen-lockfile
COPY client/tsconfig.json tsconfig.json

COPY client/ ./
COPY shared/ /opt/app/shared

RUN yarn codegen

RUN yarn build

### release
FROM node:16-alpine

WORKDIR /opt/app

ENV NODE_ENV=production

COPY client/package.json client/yarn.lock ./
COPY --from=build /opt/app/client/node_modules node_modules
COPY --from=build /opt/app/client/build build
COPY --from=build /opt/app/client/public public

EXPOSE 3000

CMD ["node_modules/.bin/remix-serve", "build"]
