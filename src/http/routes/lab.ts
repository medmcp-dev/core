import type { Context } from "hono";
import { getLabValue, listLabCategories } from "../../tools/get_lab_value.js";

export async function labHandler(c: Context): Promise<Response> {
  const action = c.req.query("action") ?? "get";
  const name = c.req.query("name");
  const category = c.req.query("category");

  if (action === "list") {
    return c.json(getLabValue({ action: "list", category }));
  }

  if (action === "categories") {
    return c.json({ categories: listLabCategories() });
  }

  if (!name) {
    return c.json(
      {
        error: "Provide ?name=<lab_test> to look up a specific test, or ?action=list to browse all.",
        categories: listLabCategories(),
      },
      400
    );
  }

  const result = getLabValue({ name, action: "get" });

  if ("error" in result) {
    return c.json(result, 404);
  }

  return c.json(result);
}
