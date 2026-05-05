import urllib.request
import urllib.error
import urllib.parse
import json
from typing import Any

from .types import AnalyzeResult, Entity, HealthResult, LabListItem, LabValue, WaitlistEntry

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

    def lab_get(self, name: str) -> dict[str, LabValue]:
        query = urllib.parse.urlencode({"name": name})
        data = self._get(f"/v1/lab?{query}")
        raw = data["lab_value"]
        return {"lab_value": self._to_lab_value(raw)}

    def lab_list(self, category: str | None = None) -> dict[str, Any]:
        params: dict[str, str] = {"action": "list"}
        if category:
            params["category"] = category
        query = urllib.parse.urlencode(params)
        data = self._get(f"/v1/lab?{query}")
        return {
            "count": int(data.get("count", 0)),
            "lab_values": [
                LabListItem(
                    name=item["name"],
                    abbreviation=item.get("abbreviation"),
                    unit=item["unit"],
                    reference_range=item["reference_range"],
                    category=item["category"],
                )
                for item in data.get("lab_values", [])
            ],
        }

    def lab_categories(self) -> list[str]:
        data = self._get("/v1/lab?action=categories")
        return list(data.get("categories", []))

    def waitlist_join(self, email: str) -> dict[str, Any]:
        data = self._post("/v1/waitlist", {"email": email})
        return {
            "ok": bool(data.get("ok", False)),
            "message": str(data.get("message", "")),
        }

    def waitlist_list(self) -> dict[str, Any]:
        data = self._get("/v1/waitlist")
        return {
            "count": int(data.get("count", 0)),
            "waitlist": [
                WaitlistEntry(
                    id=item["id"],
                    email=item["email"],
                    created_at=item["created_at"],
                )
                for item in data.get("waitlist", [])
            ],
        }

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

    def _to_lab_value(self, raw: dict[str, Any]) -> LabValue:
        return LabValue(
            name=raw["name"],
            abbreviation=raw.get("abbreviation"),
            unit=raw["unit"],
            reference_range=raw["reference_range"],
            category=raw["category"],
            critical_low=raw.get("critical_low"),
            critical_high=raw.get("critical_high"),
            interpretation=raw.get("interpretation"),
            clinical_notes=raw.get("clinical_notes"),
            male_range=raw.get("male_range"),
            female_range=raw.get("female_range"),
        )
