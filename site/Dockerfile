# Install dependencies only when needed
### build
FROM node:14-alpine AS build

ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_BASE_URL_CDN
ARG NEXT_PUBLIC_TYPESENSE_URL
ARG NEXT_PUBLIC_TYPESENSE_KEY
ARG NEXT_PUBLIC_GAME_URL

WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

WORKDIR /opt/app/site
RUN apk update && apk add --virtual libressl-dev openssl

COPY site/package.json site/yarn.lock ./
RUN yarn --frozen-lockfile
COPY site/tsconfig.generator.json site/tsconfig.generator.json
COPY site/tsconfig.json tsconfig.json
COPY site/prisma prisma
RUN yarn generate

COPY site/ ./
COPY shared/ /opt/app/shared

RUN yarn codegen

RUN yarn build
RUN yarn build:server

RUN yarn cache clean

### release
FROM node:14-alpine
RUN apk update && apk add --virtual libressl-dev openssl libgomp expat

ENV LD_LIBRARY_PATH=/usr/local/lib
COPY --from=jrottenberg/ffmpeg:4.3-alpine312 /usr/local /usr/local/

WORKDIR /opt/app

ENV NODE_ENV=production
ENV TS_NODE_TRANSPILE_ONLY=true
ENV TS_NODE_BASEURL=dist/site

COPY site/package.json site/yarn.lock ./
COPY --from=build /opt/app/site/node_modules node_modules
COPY --from=build /opt/app/site/next.config.js next.config.js
COPY --from=build /opt/app/site/.next .next
COPY --from=build /opt/app/site/tsconfig.json tsconfig.json
COPY --from=build /opt/app/site/dist dist
COPY --from=build /opt/app/site/public public

EXPOSE 3000

CMD ["node", "-r", "tsconfig-paths/register", "-r", "dotenv/config", "dist/site/index.js"]
