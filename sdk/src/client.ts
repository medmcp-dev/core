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
const DEFAULT_TIMEOUT_MS = 10_000;
const DEFAULT_MAX_RETRIES = 2;
const DEFAULT_RETRY_DELAY_MS = 250;

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
  private readonly timeoutMs: number;
  private readonly maxRetries: number;
  private readonly retryDelayMs: number;

  constructor(options: MedMCPOptions) {
    this.apiKey = options.apiKey;
    this.baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, "");
    this.timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    this.maxRetries = options.maxRetries ?? DEFAULT_MAX_RETRIES;
    this.retryDelayMs = options.retryDelayMs ?? DEFAULT_RETRY_DELAY_MS;
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
    const res = await this.request(path, {
      headers: { "X-API-Key": this.apiKey },
    });
    return this.handle<T>(res);
  }

  private async post<T>(path: string, body: unknown): Promise<T> {
    const res = await this.request(path, {
      method: "POST",
      headers: {
        "X-API-Key": this.apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return this.handle<T>(res);
  }

  private async request(path: string, init: RequestInit): Promise<Response> {
    let lastError: unknown;

    for (let attempt = 0; attempt <= this.maxRetries; attempt += 1) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

      try {
        const res = await fetch(`${this.baseUrl}${path}`, {
          ...init,
          signal: controller.signal,
        });

        if (this.shouldRetryStatus(res.status) && attempt < this.maxRetries) {
          await this.sleep(this.retryDelayMs * (attempt + 1));
          continue;
        }

        return res;
      } catch (err) {
        lastError = err;
        if (attempt >= this.maxRetries || !this.isRetryableError(err)) {
          if (err instanceof DOMException && err.name === "AbortError") {
            throw new Error(`MedMCP request timed out after ${this.timeoutMs}ms`);
          }
          throw err;
        }
        await this.sleep(this.retryDelayMs * (attempt + 1));
      } finally {
        clearTimeout(timeout);
      }
    }

    throw lastError instanceof Error ? lastError : new Error("Request failed");
  }

  private shouldRetryStatus(status: number): boolean {
    return status === 429 || (status >= 500 && status <= 599);
  }

  private isRetryableError(err: unknown): boolean {
    return err instanceof TypeError || (err instanceof DOMException && err.name === "AbortError");
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async handle<T>(res: Response): Promise<T> {
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new MedMCPError(res.status, data);
    return data as T;
  }
}
