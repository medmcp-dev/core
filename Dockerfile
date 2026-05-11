FROM node:22-slim
WORKDIR /app

RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

COPY package*.json tsconfig.json ./
COPY src/ ./src/

RUN npm ci && npm run build && npm prune --production

RUN mkdir -p /app/data

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Idempotent seed before HTTP (INSERT OR IGNORE) so production DB picks up new lab_values etc. after image updates.
CMD ["sh", "-c", "node dist/db/seed.js && exec node dist/http/server.js"]
