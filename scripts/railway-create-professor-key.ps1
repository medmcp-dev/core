# Create an API key in the SAME SQLite file as production HTTP (Railway volume).
# Prerequisites: railway CLI logged in (`railway login`) and linked to medmcp-dev/core service.
param(
  [string]$Name = "professor-demo"
)

Write-Host "Creating API key named: $Name (DB_PATH=/data/meddata.db)"
railway run -- sh -c "npm run build && DB_PATH=/data/meddata.db npm run api-keys -- create $Name"

Write-Host ""
Write-Host "Test with curl.exe (replace API_KEY from output above):"
Write-Host '  curl.exe -sS -X POST "https://core-production-389e.up.railway.app/v1/analyze" \'
Write-Host '    -H "Content-Type: application/json" -H "X-API-Key: API_KEY" \'
Write-Host '    -d "{\"type\":\"symptom\",\"data\":{\"text\":\"chest pain with shortness of breath\"}}"'
