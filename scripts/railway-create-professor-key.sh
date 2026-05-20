#!/usr/bin/env sh
# Create an API key in the SAME SQLite file as production HTTP (Railway volume).
# Prerequisites: railway CLI logged in (`railway login`) and linked to medmcp-dev/core service.
set -e
NAME="${1:-professor-demo}"
echo "Creating API key named: $NAME (inside Railway service via ssh)"
railway ssh -- sh -c "cd /app && npm run build && DB_PATH=/data/meddata.db npm run api-keys -- create $NAME"
echo ""
echo "Test with curl (replace API_KEY from output above):"
echo '  curl -sS -w "\nHTTP:%{http_code}\n" -X POST "https://core-production-389e.up.railway.app/v1/analyze" \'
echo '    -H "Content-Type: application/json" -H "X-API-Key: API_KEY" \'
echo '    -d '"'"'{"type":"symptom","data":{"text":"chest pain with shortness of breath"}}'"'"''
