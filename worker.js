export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const db = env.DB; // D1 binding name in wrangler.toml

    if (path === "/articles") {
      // GET all articles
      if (request.method === "GET") {
        const res = await db
          .prepare("SELECT id, title, content, created_at FROM articles ORDER BY created_at DESC")
          .all();
        return new Response(JSON.stringify(res.results), {
          headers: { "Content-Type": "application/json" }
        });
      }

      // POST new article
      if (request.method === "POST") {
        const body = await request.json();
        const { title, content } = body;
        if (!title || !content)
          return new Response("Invalid input", { status: 400 });

        const res = await db
          .prepare(
            "INSERT INTO articles (title, content, created_at) VALUES (?, ?, CURRENT_TIMESTAMP)"
          )
          .run(title, content);

        return new Response(JSON.stringify({ id: res.lastInsertRowid, title, content }), {
          headers: { "Content-Type": "application/json" }
        });
      }

      return new Response("Method not allowed", { status: 405 });
    }

    return new Response("Not found", { status: 404 });
  }
};
