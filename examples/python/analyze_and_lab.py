#!/usr/bin/env python3
"""Minimal urllib calls: POST /v1/analyze + GET /v1/lab (no pip install needed)."""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request

DEFAULT_BASE = "https://core-production-389e.up.railway.app"


def main() -> None:
    key = os.environ.get("MEDDATA_API_KEY")
    if not key:
        print("Set MEDDATA_API_KEY", file=sys.stderr)
        sys.exit(1)

    base = (os.environ.get("MEDDATA_BASE_URL") or DEFAULT_BASE).rstrip("/")

    analyze_payload = json.dumps(
        {
            "type": "symptom",
            "data": {"text": "shortness of breath and chest discomfort for about an hour"},
        }
    ).encode()

    req_a = urllib.request.Request(
        f"{base}/v1/analyze",
        data=analyze_payload,
        headers={"X-API-Key": key, "Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req_a, timeout=30) as res:
            body = json.loads(res.read().decode())
            print("POST /v1/analyze", res.status, json.dumps(body, indent=2))
    except urllib.error.HTTPError as e:
        err = e.read().decode() if e.fp else ""
        print("POST /v1/analyze", e.code, err, file=sys.stderr)
        sys.exit(1)

    qs = urllib.parse.urlencode({"name": "troponin"})
    req_l = urllib.request.Request(f"{base}/v1/lab?{qs}", headers={"X-API-Key": key})
    try:
        with urllib.request.urlopen(req_l, timeout=30) as res:
            body = json.loads(res.read().decode())
            print("\nGET /v1/lab?name=troponin", res.status, json.dumps(body, indent=2))
    except urllib.error.HTTPError as e:
        err = e.read().decode() if e.fp else ""
        print("GET /v1/lab", e.code, err, file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
