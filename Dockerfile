FROM node:12.22.3-alpine as build

# Не отправлять телеметрию в https://telemetry.nextjs.org/api/v1/record
# Подробнее тут: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Требуется для работы next.js
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./
COPY .npmrc ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:12.22.3-alpine

ENV HOME /app
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR ${HOME}

COPY --from=build  /app/node_modules ./node_modules
COPY --from=build  /app/package*.json ./
COPY --from=build  /app/next.config.js ./
COPY --from=build  /app/public ./public
COPY --from=build  /app/.next ./.next

# Для того, чтобы next мог писать кеш
RUN chmod -R 777 /app/.next/cache

EXPOSE 3000
CMD ["npm", "start"]
