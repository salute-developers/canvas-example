FROM node:18.12.0-alpine as deps
WORKDIR /app

COPY package*.json ./
COPY .npmrc ./

RUN npm ci

FROM node:18.12.0-alpine as build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM node:18.12.0-alpine

FROM node:18.12.0-alpine as runner
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=build --chown=nobody:nobody /app/public ./public
COPY --from=build --chown=nobody:nobody /app/package.json ./
COPY --from=build --chown=nobody:nobody /app/.next/standalone ./
COPY --from=build --chown=nobody:nobody /app/.next/static ./.next/static


EXPOSE 3000
CMD ["node", "server.js"]
