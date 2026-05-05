FROM node:22-slim AS builder
WORKDIR /app

RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
ARG CACHEBUST=2
COPY src/ ./src/
RUN npm run build && npm prune --omit=dev

FROM node:22-slim AS runner
WORKDIR /app
ARG CACHEBUST=2

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

ENV NODE_ENV=production
ENV PORT=3000
ENV DB_PATH=/data/meddata.db

RUN mkdir -p /data

EXPOSE 3000

RUN node -e "require('better-sqlite3'); console.log('native module ok')"

CMD ["sh", "-c", "node dist/http/server.js 2>&1"]
