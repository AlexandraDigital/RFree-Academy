// functions/api/progress/save.js
// Cloudflare Pages Function — POST /api/progress/save
// Requires D1 binding named "DB" in Pages → Settings → Functions → D1 bindings

async function hash(str) {
  const enc = new TextEncoder().encode(str);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}

async function verifyToken(token) {
  try {
    const SECRET = "rfree-academy";
    const [base, signature] = token.split(".");
    if (!base || !signature) return null;
    const validSignature = await hash(base + SECRET);
    if (validSignature !== signature) return null;
    const payload = JSON.parse(atob(base));
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const auth = request.headers.get("Authorization");
    const token = auth?.split(" ")[1];
    const user = token ? await verifyToken(token) : null;

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { lessonId, completed, watchTime } = await request.json();

    await env.DB.prepare(
      `INSERT OR REPLACE INTO progress (user_id, lesson_id, completed, watch_time)
       VALUES (?, ?, ?, ?)`
    ).bind(user.id, lessonId, completed ? 1 : 0, watchTime || 0).run();

    return Response.json({ ok: true });

  } catch (e) {
    return Response.json({ error: "Server error: " + e.message }, { status: 500 });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
