# Create an API key in the SAME SQLite file as production HTTP (Railway volume).
# Prerequisites: railway CLI logged in (`railway login`) and linked to medmcp-dev/core service.
param(
  [string]$Name = "professor-demo"
)

# railway run = local Windows + env vars (cannot write /data/meddata.db on the volume).
# railway ssh = command inside the deployed Linux container (correct for production keys).
Write-Host "Creating API key named: $Name (inside Railway service, DB_PATH from service env)"
railway ssh -- sh -c "cd /app && npm run build && DB_PATH=/data/meddata.db npm run api-keys -- create $Name"

Write-Host ""
Write-Host "Test with curl.exe (replace API_KEY from output above):"
Write-Host '  curl.exe -sS -X POST "https://core-production-389e.up.railway.app/v1/analyze" \'
Write-Host '    -H "Content-Type: application/json" -H "X-API-Key: API_KEY" \'
Write-Host '    -d "{\"type\":\"symptom\",\"data\":{\"text\":\"chest pain with shortness of breath\"}}"'
