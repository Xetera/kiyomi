FROM node:14-slim AS build

WORKDIR /opt/app
# tensorflow needs these binaries
RUN apt-get update && \ 
    apt-get install -y build-essential \
    wget \
    python3 \
    make \
    gcc \ 
    libc6-dev \
    libssl-dev

RUN npm i -g pnpm
RUN pnpm i -g ts-node typescript
COPY package.json pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile
# Rebuilding tensorflow dependencies for some reason because it causes weird bugs without it???
RUN pnpm tf
COPY tsconfig.json tsconfig.json
COPY src src
RUN pnpm build

FROM node:14-slim
RUN apt-get update && apt-get install -y libssl-dev

WORKDIR /opt/app

ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml ./
COPY --from=build /opt/app/node_modules node_modules
COPY --from=build /opt/app/dist dist

COPY weights weights

CMD ["node", "./dist/index.js"]