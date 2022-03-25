# Install dependencies only when needed
### build
FROM node:16-alpine AS build

WORKDIR /opt/app/api
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

RUN apk update && apk add --virtual libressl-dev openssl

COPY site/api/package.json site/api/yarn.lock ./
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn --frozen-lockfile
COPY site/api/tsconfig.json tsconfig.json
COPY site/api/prisma prisma
RUN yarn generate

COPY site/api/ ./
#COPY shared/ /opt/app/shared

RUN yarn build

### release
FROM node:16-alpine
RUN apk update && apk add --virtual libressl-dev openssl libgomp expat

ENV LD_LIBRARY_PATH=/usr/local/lib
COPY --from=jrottenberg/ffmpeg:4.3-alpine312 /usr/local /usr/local/

WORKDIR /opt/app/api

ENV NODE_ENV=production
ENV TS_NODE_TRANSPILE_ONLY=true
ENV TS_NODE_BASEURL=dist/site/api

COPY site/api/package.json site/api/yarn.lock ./
COPY --from=build /opt/app/api/node_modules node_modules
COPY --from=build /opt/app/api/tsconfig.json tsconfig.json
COPY --from=build /opt/app/api/dist dist

EXPOSE 3000

CMD ["node", "-r", "tsconfig-paths/register", "dist/src/main.js"]