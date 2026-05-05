import { z } from "zod";
import { addToWaitlist, getWaitlist } from "../../db/database.js";
const WaitlistSchema = z.object({
    email: z.string().email("Invalid email address"),
});
export async function waitlistPostHandler(c) {
    let body;
    try {
        body = await c.req.json();
    }
    catch {
        return c.json({ error: "Invalid JSON body" }, 400);
    }
    const parsed = WaitlistSchema.safeParse(body);
    if (!parsed.success) {
        return c.json({ error: "Invalid email address" }, 400);
    }
    const result = addToWaitlist(parsed.data.email);
    if (result.already_exists) {
        return c.json({ ok: true, message: "You're already on the list." });
    }
    return c.json({ ok: true, message: "You're on the list." }, 201);
}
export async function waitlistGetHandler(c) {
    const list = getWaitlist();
    return c.json({ count: list.length, waitlist: list });
}
//# sourceMappingURL=waitlist.js.map