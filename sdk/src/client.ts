import type { AnalyzeResult, HealthResult, MedMCPOptions } from "./types.js";

const DEFAULT_BASE_URL = "https://core-production-389e.up.railway.app";

export class MedMCPError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, body: unknown) {
    super(`MedMCP API error ${status}`);
    this.name = "MedMCPError";
    this.status = status;
    this.body = body;
  }
}

export class MedMCP {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(options: MedMCPOptions) {
    this.apiKey = options.apiKey;
    this.baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, "");
  }

  async analyze(text: string): Promise<AnalyzeResult> {
    return this.post<AnalyzeResult>("/v1/analyze", {
      type: "symptom",
      data: { text },
    });
  }

  async health(): Promise<HealthResult> {
    return this.get<HealthResult>("/v1/health");
  }

  async schema(): Promise<unknown> {
    return this.get<unknown>("/v1/schema");
  }

  private async get<T>(path: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      headers: { "X-API-Key": this.apiKey },
    });
    return this.handle<T>(res);
  }

  private async post<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: {
        "X-API-Key": this.apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return this.handle<T>(res);
  }

  private async handle<T>(res: Response): Promise<T> {
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new MedMCPError(res.status, data);
    return data as T;
  }
}
