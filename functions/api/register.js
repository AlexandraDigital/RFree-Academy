// functions/api/register.js
// Cloudflare Pages Function — POST /api/register
// Requires D1 binding named "DB" in Pages → Settings → Functions → D1 bindings

async function hash(str) {
  const enc = new TextEncoder().encode(str);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}

async function createToken(user) {
  const SECRET = "rfree-academy";
  const payload = {
    id: user.id,
    role: user.role,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000
  };
  const base = btoa(JSON.stringify(payload));
  const signature = await hash(base + SECRET);
  return `${base}.${signature}`;
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { email, password, role } = await request.json();

    if (!email || !password) {
      return Response.json({ error: "Email and password are required." }, { status: 400 });
    }

    // Check if email already exists
    const existing = await env.DB.prepare(
      "SELECT id FROM users WHERE email = ?"
    ).bind(email).first();

    if (existing) {
      return Response.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    const hashed = await hash(password);
    const userRole = role || "student";

    const result = await env.DB.prepare(
      "INSERT INTO users (email, password, role, created_at) VALUES (?, ?, ?, ?)"
    ).bind(email, hashed, userRole, new Date().toISOString()).run();

    const newUser = { id: result.meta.last_row_id, role: userRole };
    const token = await createToken(newUser);

    return Response.json({ token, role: userRole, userId: newUser.id });

  } catch (e) {
    return Response.json({ error: "Server error: " + e.message }, { status: 500 });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
