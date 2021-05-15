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

FROM python:3.8-slim
# Install node
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
RUN apt update && apt-get install -y nodejs
RUN apt-get install -y libssl-dev build-essential

WORKDIR /opt/app

ENV NODE_ENV=production

COPY requirements.txt requirements.txt
COPY package.json yarn.lock ./
RUN yarn global add node-pre-gyp
RUN yarn --production --frozen-lockfile
RUN pip3 install -r requirements.txt
COPY --from=build /opt/app/dist dist
COPY *.py ./
# Rebuilding tensorflow dependencies for some reason because it causes weird bugs without it???

COPY weights weights

RUN yarn tf

CMD ["node", "--enable-source-maps", "./dist/index.js"]