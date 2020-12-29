# Install dependencies only when needed
FROM node:buster-slim AS deps

WORKDIR /opt/app
COPY package.json yarn.lock ./
# tensorflow needs these binaries
RUN apt-get update && \ 
    apt-get install -y build-essential \
    wget \
    python3 \
    make \
    gcc \ 
    libc6-dev 

RUN yarn --frozen-lockfile

# Rebuild the source code only when needed
# This is where because may be the case that you would try
# to build the app based on some `X_TAG` in my case (Git commit hash)
# but the code hasn't changed.
FROM node:buster-slim AS builder

ENV NODE_ENV=production
WORKDIR /opt/app
COPY . .
COPY --from=deps /opt/app/node_modules ./node_modules
RUN yarn build

# Production image, copy all the files and run next
FROM node:buster-slim AS runner

ARG X_TAG
WORKDIR /opt/app
ENV NODE_ENV=production


COPY --from=builder /opt/app/next.config.js ./
COPY --from=builder /opt/app/public ./public
COPY --from=builder /opt/app/.next ./.next
COPY --from=builder /opt/app/node_modules ./node_modules
CMD ["node_modules/.bin/next", "start"]