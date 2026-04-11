async function hashString(base, secret) {
  const enc = new TextEncoder().encode(base + secret);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyToken(token, env) {
  try {
    const SECRET = env.TOKEN_SECRET || "rfree-academy";
    const [base, signature] = (token || "").split(".");
    if (!base || !signature) return null;

    const expected = await hashString(base, SECRET);
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
  const payload = await verifyToken(token, env);

  if (!payload) return null;

  return env.DB.prepare(
    "SELECT id, email, role, created_at FROM users WHERE id = ?"
  ).bind(payload.id).first();
}

export async function requireAuth(request, env) {
  const user = await getUserFromRequest(request, env);
  if (!user) return null;
  return user;
}

export async function requireAdmin(request, env) {
  const user = await getUserFromRequest(request, env);
  if (!user || user.role !== "admin") return null;
  return user;
}

export async function createToken(user, env) {
  const SECRET = env.TOKEN_SECRET || "rfree-academy";
  const payload = {
    id: user.id,
    role: user.role,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
  };
  const base = btoa(JSON.stringify(payload));
  const signature = await hashString(base, SECRET);
  return `${base}.${signature}`;
}

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
