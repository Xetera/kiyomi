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
COPY tsconfig.json tsconfig.json
COPY src src
RUN pnpm build

FROM node:14-slim
RUN apt-get update && apt-get install -y libssl-dev build-essential

WORKDIR /opt/app

ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm node-pre-gyp
RUN pnpm i node-pre-gyp -g
RUN pnpm i --production --frozen-lockfile
RUN npm rebuild @tensorflow/tfjs-node build-addon-from-source
COPY --from=build /opt/app/dist dist

COPY weights weights

CMD ["node", "./dist/index.js"]