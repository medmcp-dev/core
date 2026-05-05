FROM node:22-slim
WORKDIR /app

RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci --omit=dev

COPY dist/ ./dist/

ENV NODE_ENV=production
ENV PORT=3000
ENV DB_PATH=/data/meddata.db

RUN mkdir -p /data

EXPOSE 3000

CMD ["sh", "-c", "echo '=== CONTAINER START ===' && node --version && ls dist/http/server.js && node dist/http/server.js 2>&1"]
