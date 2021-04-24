# Install dependencies only when needed
### build
FROM node:14-alpine AS build

ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_BASE_URL_CDN

WORKDIR /opt/app
RUN apk update && apk add --virtual libressl-dev openssl

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY tsconfig.generator.json tsconfig.generator.json
COPY tsconfig.json tsconfig.json
COPY prisma prisma
RUN yarn generate

COPY . .
# COPY lib/shared.ts lib/shared.ts
# COPY lib/context.ts lib/context.ts
# COPY lib/types lib/types
RUN yarn codegen

RUN yarn build

RUN yarn cache clean

### release
FROM node:14-alpine
RUN apk update && apk add --virtual libressl-dev openssl libgomp expat

ENV LD_LIBRARY_PATH=/usr/local/lib
COPY --from=jrottenberg/ffmpeg:4.3-alpine312 /usr/local /usr/local/

WORKDIR /opt/app

ENV NODE_ENV=production
WORKDIR /opt/app

COPY package.json yarn.lock ./
# Rebuilding tensorflow dependencies for some reason because it causes weird bugs without it???
COPY --from=build /opt/app/node_modules node_modules
COPY --from=build /opt/app/.next .next
COPY --from=build /opt/app/public public

EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]