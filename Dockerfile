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
    libc6-dev \
    libssl-dev

RUN yarn --frozen-lockfile
COPY prisma prisma
RUN yarn generate

# Rebuild the source code only when needed
# This is where because may be the case that you would try
# to build the app based on some `X_TAG` in my case (Git commit hash)
# but the code hasn't changed.
FROM node:14-slim AS builder

ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_BASE_URL_CDN

ENV NODE_ENV=production
WORKDIR /opt/app
COPY . .

# COPY --from=deps ~/.yarn ~/.yarn
COPY --from=deps /opt/app/node_modules ./node_modules
RUN yarn build
# Rebuilding tensorflow dependencies for some reason???
RUN yarn tf

# Production image, copy all the files and run next
FROM node:14-slim AS runner
RUN apt-get update && apt-get install -y libssl-dev

ARG X_TAG
WORKDIR /opt/app
ENV NODE_ENV=production


COPY --from=builder /opt/app/next.config.js ./
COPY --from=builder /opt/app/public ./public
COPY --from=builder /opt/app/.next ./.next
COPY --from=builder /opt/app/node_modules ./node_modules

RUN useradd simp
USER simp

CMD ["node_modules/.bin/next", "start"]