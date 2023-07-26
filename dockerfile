# syntax=docker/dockerfile:1

FROM node:18-bullseye
RUN apt-get update && apt-get install -y pnpm
WORKDIR /app
COPY package.json .
COPY . .
RUN pnpm install
CMD ["bun", "run", "build"]
