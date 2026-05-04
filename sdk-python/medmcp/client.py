import urllib.request
import urllib.error
import json
from typing import Any

from .types import AnalyzeResult, Entity, HealthResult

DEFAULT_BASE_URL = "https://core-production-389e.up.railway.app"


class MedMCPError(Exception):
    def __init__(self, status: int, body: Any) -> None:
        super().__init__(f"MedMCP API error {status}")
        self.status = status
        self.body = body


class MedMCP:
    def __init__(self, api_key: str, base_url: str = DEFAULT_BASE_URL) -> None:
        self._api_key = api_key
        self._base_url = base_url.rstrip("/")

    def analyze(self, text: str) -> AnalyzeResult:
        data = self._post("/v1/analyze", {"type": "symptom", "data": {"text": text}})
        return AnalyzeResult(
            risk_level=data["risk_level"],
            confidence=data["confidence"],
            entities=[
                Entity(
                    type=e["type"],
                    value=e["value"],
                    metadata=e.get("metadata") or {},
                )
                for e in data.get("entities", [])
            ],
            source_type=data["source_type"],
            interpretation=data["interpretation"],
        )

    def health(self) -> HealthResult:
        data = self._get("/v1/health")
        return HealthResult(
            status=data["status"],
            version=data["version"],
            timestamp=data["timestamp"],
        )

    def schema(self) -> dict[str, Any]:
        return self._get("/v1/schema")  # type: ignore[return-value]

    def _get(self, path: str) -> dict[str, Any]:
        req = urllib.request.Request(
            f"{self._base_url}{path}",
            headers={"X-API-Key": self._api_key},
        )
        return self._send(req)

    def _post(self, path: str, body: Any) -> dict[str, Any]:
        payload = json.dumps(body).encode()
        req = urllib.request.Request(
            f"{self._base_url}{path}",
            data=payload,
            headers={
                "X-API-Key": self._api_key,
                "Content-Type": "application/json",
            },
            method="POST",
        )
        return self._send(req)

    def _send(self, req: urllib.request.Request) -> dict[str, Any]:
        try:
            with urllib.request.urlopen(req) as res:
                return json.loads(res.read().decode())
        except urllib.error.HTTPError as e:
            body = json.loads(e.read().decode()) if e.fp else {}
            raise MedMCPError(e.code, body) from e
