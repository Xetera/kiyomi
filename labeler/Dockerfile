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
RUN yarn global add ts-node typescript
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY tsconfig.json tsconfig.json
COPY src src
RUN yarn build
RUN yarn tf

FROM node:14-slim
RUN apt-get update && apt-get install -y libssl-dev build-essential python3

WORKDIR /opt/app

ENV NODE_ENV=production

COPY package.json yarn.lock ./
RUN yarn global add node-pre-gyp
RUN yarn --production --frozen-lockfile
COPY --from=build /opt/app/dist dist
# Rebuilding tensorflow dependencies for some reason because it causes weird bugs without it???

COPY weights weights

RUN yarn tf

CMD ["node", "./dist/index.js"]