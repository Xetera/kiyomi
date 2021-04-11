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

RUN yarn global add ts-node typescript
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
# Rebuilding tensorflow dependencies for some reason because it causes weird bugs without it???
RUN yarn tf
RUN yarn build
RUN yarn cache clean

FROM node:14-slim
RUN apt-get update && apt-get install -y libssl-dev

WORKDIR /opt/app

ENV NODE_ENV=production

COPY package.json yarn.lock ./
COPY --from=build /opt/app/node_modules node_modules
COPY --from=build /opt/app/dist dist

COPY weights weights

CMD ["yarn", "start"]