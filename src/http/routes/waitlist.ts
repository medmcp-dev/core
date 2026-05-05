import type { Context } from "hono";
import { z } from "zod";

type WaitlistDb = {
  addToWaitlist: (email: string) => { ok: boolean; already_exists: boolean };
  getWaitlist: () => { id: number; email: string; created_at: string }[];
};

let waitlistDb: WaitlistDb | null = null;

async function getWaitlistDb(): Promise<WaitlistDb> {
  if (waitlistDb) return waitlistDb;

  const db = await import("../../db/database.js");
  waitlistDb = {
    addToWaitlist: db.addToWaitlist,
    getWaitlist: db.getWaitlist,
  };
  return waitlistDb;
}

const WaitlistSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function waitlistPostHandler(c: Context): Promise<Response> {
  let body: unknown;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const parsed = WaitlistSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Invalid email address" }, 400);
  }

  let result: { ok: boolean; already_exists: boolean };
  try {
    const db = await getWaitlistDb();
    result = db.addToWaitlist(parsed.data.email);
  } catch (err) {
    console.error("Waitlist DB initialization failed:", err);
    return c.json({ error: "Service unavailable" }, 503);
  }

  if (result.already_exists) {
    return c.json({ ok: true, message: "You're already on the list." });
  }

  return c.json({ ok: true, message: "You're on the list." }, 201);
}

export async function waitlistGetHandler(c: Context): Promise<Response> {
  let list: { id: number; email: string; created_at: string }[];
  try {
    const db = await getWaitlistDb();
    list = db.getWaitlist();
  } catch (err) {
    console.error("Waitlist DB initialization failed:", err);
    return c.json({ error: "Service unavailable" }, 503);
  }
  return c.json({ count: list.length, waitlist: list });
}
