const TOKEN_SECRET = "rfree-academy";

async function hashString(value) {
  const enc = new TextEncoder().encode(value);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyToken(token) {
  try {
    const [base, signature] = (token || "").split(".");
    if (!base || !signature) return null;

    const expected = await hashString(base + TOKEN_SECRET);
    if (expected !== signature) return null;

    const payload = JSON.parse(atob(base));
    if (!payload?.id || payload.exp < Date.now()) return null;

    return payload;
  } catch {
    return null;
  }
}

export async function getUserFromRequest(request, env) {
  const auth = request.headers.get("Authorization");
  const token = auth?.split(" ")[1];
  const payload = await verifyToken(token);

  if (!payload) return null;

  return env.DB.prepare(
    "SELECT id, email, role, created_at FROM users WHERE id = ?"
  ).bind(payload.id).first();
}

export async function requireAdmin(request, env) {
  const user = await getUserFromRequest(request, env);
  if (!user || user.role !== "admin") return null;
  return user;
}

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
