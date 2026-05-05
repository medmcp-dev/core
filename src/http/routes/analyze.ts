import type { Context } from "hono";
import { z } from "zod";
import { analyzeSymptoms } from "../../analyze/symptom-engine.js";

const SymptomDataSchema = z.object({
  text: z.string().min(1, "text must not be empty"),
});

const AnalyzeInputSchema = z.object({
  type: z.enum(["symptom", "lab", "vitals", "medication"]),
  data: z.record(z.string(), z.unknown()),
});

export async function analyzeHandler(c: Context): Promise<Response> {
  let body: unknown;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const parsed = AnalyzeInputSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Invalid request", details: parsed.error.flatten() }, 400);
  }

  const { type, data } = parsed.data;

  if (type !== "symptom") {
    return c.json(
      {
        error: `Type '${type}' is not supported in v1. Only 'symptom' is available.`,
        supported_types: ["symptom"],
      },
      501
    );
  }

  const symptomParsed = SymptomDataSchema.safeParse(data);
  if (!symptomParsed.success) {
    return c.json(
      { error: "Invalid symptom data", details: symptomParsed.error.flatten() },
      400
    );
  }

  const output = analyzeSymptoms(symptomParsed.data.text);
  return c.json(output, 200);
}
