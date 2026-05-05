import type {
  AnalyzeResult,
  HealthResult,
  LabCategoriesResult,
  LabGetResult,
  LabListResult,
  MedMCPOptions,
  WaitlistJoinResult,
  WaitlistListResult,
} from "./types.js";

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

  async labGet(name: string): Promise<LabGetResult> {
    const query = new URLSearchParams({ name });
    return this.get<LabGetResult>(`/v1/lab?${query.toString()}`);
  }

  async labList(category?: string): Promise<LabListResult> {
    const query = new URLSearchParams({ action: "list" });
    if (category) query.set("category", category);
    return this.get<LabListResult>(`/v1/lab?${query.toString()}`);
  }

  async labCategories(): Promise<LabCategoriesResult> {
    const query = new URLSearchParams({ action: "categories" });
    return this.get<LabCategoriesResult>(`/v1/lab?${query.toString()}`);
  }

  async waitlistJoin(email: string): Promise<WaitlistJoinResult> {
    return this.post<WaitlistJoinResult>("/v1/waitlist", { email });
  }

  async waitlistList(): Promise<WaitlistListResult> {
    return this.get<WaitlistListResult>("/v1/waitlist");
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
