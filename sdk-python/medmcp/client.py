import urllib.request
import urllib.error
import urllib.parse
import json
import socket
import time
from typing import Any

from .types import AnalyzeResult, Entity, HealthResult, LabListItem, LabValue, WaitlistEntry

DEFAULT_BASE_URL = "https://core-production-389e.up.railway.app"
DEFAULT_TIMEOUT_MS = 10_000
DEFAULT_MAX_RETRIES = 2
DEFAULT_RETRY_DELAY_MS = 250


class MedMCPError(Exception):
    def __init__(self, status: int, body: Any) -> None:
        super().__init__(f"MedMCP API error {status}")
        self.status = status
        self.body = body


class MedMCP:
    def __init__(
        self,
        api_key: str,
        base_url: str = DEFAULT_BASE_URL,
        *,
        timeout_ms: int = DEFAULT_TIMEOUT_MS,
        max_retries: int = DEFAULT_MAX_RETRIES,
        retry_delay_ms: int = DEFAULT_RETRY_DELAY_MS,
    ) -> None:
        self._api_key = api_key
        self._base_url = base_url.rstrip("/")
        self._timeout_ms = timeout_ms
        self._max_retries = max_retries
        self._retry_delay_ms = retry_delay_ms

    def analyze(self, text: str) -> AnalyzeResult:
        data = self._execute("POST", "/v1/analyze", {"type": "symptom", "data": {"text": text}})
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
        data = self._execute("GET", "/v1/health")
        return HealthResult(
            status=data["status"],
            version=data["version"],
            timestamp=data["timestamp"],
            release=data.get("release"),
            data_revision=data.get("data_revision"),
            git_revision=data.get("git_revision"),
        )

    def schema(self) -> dict[str, Any]:
        return self._execute("GET", "/v1/schema")  # type: ignore[return-value]

    def lab_get(self, name: str) -> dict[str, LabValue]:
        query = urllib.parse.urlencode({"name": name})
        data = self._execute("GET", f"/v1/lab?{query}")
        raw = data["lab_value"]
        return {"lab_value": self._to_lab_value(raw)}

    def lab_list(self, category: str | None = None) -> dict[str, Any]:
        params: dict[str, str] = {"action": "list"}
        if category:
            params["category"] = category
        query = urllib.parse.urlencode(params)
        data = self._execute("GET", f"/v1/lab?{query}")
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
        data = self._execute("GET", "/v1/lab?action=categories")
        return list(data.get("categories", []))

    def waitlist_join(self, email: str) -> dict[str, Any]:
        data = self._execute("POST", "/v1/waitlist", {"email": email})
        return {
            "ok": bool(data.get("ok", False)),
            "message": str(data.get("message", "")),
        }

    def waitlist_list(self) -> dict[str, Any]:
        data = self._execute("GET", "/v1/waitlist")
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

    def _execute(self, method: str, path: str, json_body: dict[str, Any] | None = None) -> dict[str, Any]:
        url = f"{self._base_url}{path}"
        timeout_sec = self._timeout_ms / 1000.0
        last_transport: BaseException | None = None

        for attempt in range(self._max_retries + 1):
            headers: dict[str, str] = {"X-API-Key": self._api_key}
            data_bytes: bytes | None = None
            if json_body is not None:
                data_bytes = json.dumps(json_body).encode()
                headers["Content-Type"] = "application/json"

            req = urllib.request.Request(url, data=data_bytes, headers=headers, method=method)

            try:
                with urllib.request.urlopen(req, timeout=timeout_sec) as res:
                    return json.loads(res.read().decode())
            except urllib.error.HTTPError as e:
                raw = e.read().decode() if e.fp else ""
                try:
                    body: Any = json.loads(raw) if raw.strip() else {}
                except json.JSONDecodeError:
                    body = {}
                if self._should_retry_status(e.code) and attempt < self._max_retries:
                    time.sleep((self._retry_delay_ms * (attempt + 1)) / 1000.0)
                    continue
                raise MedMCPError(e.code, body) from e
            except (urllib.error.URLError, TimeoutError, ConnectionError, OSError) as e:
                last_transport = e
                if attempt >= self._max_retries or not self._should_retry_transport(e):
                    if self._is_timeout(e):
                        raise RuntimeError(
                            f"MedMCP request timed out after {self._timeout_ms}ms"
                        ) from e
                    raise
                time.sleep((self._retry_delay_ms * (attempt + 1)) / 1000.0)

        if last_transport is not None and self._is_timeout(last_transport):
            raise RuntimeError(f"MedMCP request timed out after {self._timeout_ms}ms") from last_transport

        raise RuntimeError("Request failed")

    def _should_retry_status(self, status: int) -> bool:
        return status == 429 or (500 <= status <= 599)

    def _should_retry_transport(self, e: BaseException) -> bool:
        if isinstance(e, (TimeoutError, ConnectionError, BrokenPipeError)):
            return True
        if isinstance(e, urllib.error.URLError):
            r = e.reason
            return isinstance(r, (TimeoutError, ConnectionError, OSError, socket.timeout))
        return isinstance(e, socket.timeout)

    def _is_timeout(self, e: BaseException) -> bool:
        if isinstance(e, TimeoutError):
            return True
        if isinstance(e, socket.timeout):
            return True
        if isinstance(e, urllib.error.URLError) and isinstance(
            e.reason,
            (TimeoutError, socket.timeout),
        ):
            return True
        return False

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
