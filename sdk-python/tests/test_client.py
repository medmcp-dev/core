import io
import json
import unittest
from unittest.mock import patch
import urllib.error

from medmcp.client import MedMCP, MedMCPError
from medmcp.types import LabListItem, WaitlistEntry


class FakeResponse:
    def __init__(self, payload: dict):
        self._payload = payload

    def read(self) -> bytes:
        return json.dumps(self._payload).encode()

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, tb):
        return False


class TestMedMCPClient(unittest.TestCase):
    @patch("urllib.request.urlopen")
    def test_lab_list_smoke(self, mock_urlopen):
        mock_urlopen.return_value = FakeResponse(
            {
                "count": 1,
                "lab_values": [
                    {
                        "name": "troponin I",
                        "abbreviation": "hs-TnI",
                        "unit": "ng/L",
                        "reference_range": "<14",
                        "category": "cardiac",
                    }
                ],
            }
        )

        client = MedMCP(api_key="test_key", base_url="https://example.com")
        result = client.lab_list("cardiac")

        self.assertEqual(result["count"], 1)
        self.assertIsInstance(result["lab_values"][0], LabListItem)
        self.assertEqual(result["lab_values"][0].name, "troponin I")

    @patch("urllib.request.urlopen")
    def test_waitlist_list_parses_entries(self, mock_urlopen):
        mock_urlopen.return_value = FakeResponse(
            {
                "count": 1,
                "waitlist": [
                    {"id": 1, "email": "user@example.com", "created_at": "2026-01-01T00:00:00Z"}
                ],
            }
        )

        client = MedMCP(api_key="test_key", base_url="https://example.com")
        result = client.waitlist_list()

        self.assertEqual(result["count"], 1)
        self.assertIsInstance(result["waitlist"][0], WaitlistEntry)
        self.assertEqual(result["waitlist"][0].email, "user@example.com")

    @patch("urllib.request.urlopen")
    def test_raises_medmcp_error_on_http_error(self, mock_urlopen):
        error_body = io.BytesIO(json.dumps({"error": "Unauthorized"}).encode())
        mock_urlopen.side_effect = urllib.error.HTTPError(
            url="https://example.com/v1/lab?action=categories",
            code=401,
            msg="Unauthorized",
            hdrs=None,
            fp=error_body,
        )

        client = MedMCP(api_key="bad_key", base_url="https://example.com")

        with self.assertRaises(MedMCPError) as ctx:
            client.lab_categories()

        self.assertEqual(ctx.exception.status, 401)
        self.assertEqual(ctx.exception.body["error"], "Unauthorized")

    @patch("urllib.request.urlopen")
    def test_retries_5xx_then_succeeds(self, mock_urlopen):
        attempt = {"n": 0}

        def side_effect(_req, timeout=None):
            attempt["n"] += 1
            if attempt["n"] < 3:
                fp = io.BytesIO(b"{}")
                raise urllib.error.HTTPError(
                    "https://example.com/v1/lab?action=categories",
                    503,
                    "Service Unavailable",
                    None,
                    fp,
                )
            return FakeResponse({"categories": ["cardiac"]})

        mock_urlopen.side_effect = side_effect

        client = MedMCP(
            api_key="test_key",
            base_url="https://example.com",
            max_retries=2,
            retry_delay_ms=1,
        )
        result = client.lab_categories()
        self.assertEqual(result, ["cardiac"])
        self.assertEqual(attempt["n"], 3)

    @patch("urllib.request.urlopen")
    def test_timeout_raises_runtime_error(self, mock_urlopen):
        mock_urlopen.side_effect = TimeoutError()

        client = MedMCP(
            api_key="test_key",
            base_url="https://example.com",
            timeout_ms=10,
            max_retries=0,
        )

        with self.assertRaises(RuntimeError) as ctx:
            client.lab_categories()

        self.assertRegex(str(ctx.exception).lower(), r"timed out")


if __name__ == "__main__":
    unittest.main()
