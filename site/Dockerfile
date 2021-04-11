# Install dependencies only when needed
FROM node:14-alpine AS build

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

FROM node:14-alpine
RUN apk update && apk add --virtual libressl-dev ffmpeg openssl libwebp libwebp-tools

WORKDIR /opt/app
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_BASE_URL_CDN

ENV NODE_ENV=production
WORKDIR /opt/app

COPY package.json yarn.lock ./
# Rebuilding tensorflow dependencies for some reason because it causes weird bugs without it???
COPY --from=build /opt/app/node_modules node_modules
COPY --from=build /opt/app/.next .next
COPY --from=build /opt/app/public public

EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]