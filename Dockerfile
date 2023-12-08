FROM oven/bun

WORKDIR /usr/src/app

COPY package*.json bun.lockb ./
RUN bun i
COPY . .

ENV NODE_ENV production

CMD [ "bun", "start" ]
