# syntax=docker/dockerfile:1

FROM node:18-bullseye
FROM oven/bun:latest
WORKDIR /app
COPY package.json .
COPY . .
RUN bun install
CMD ["bun", "run", "build"]
