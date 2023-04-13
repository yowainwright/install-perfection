# syntax=docker/dockerfile:1

FROM node:18-alpine
FROM oven/bun:latest
WORKDIR /src
COPY package.json .
RUN bun install
COPY . .
CMD ["bun", "run", "build"]
