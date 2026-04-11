// functions/api/teacher/my-lessons.js
// GET /api/teacher/my-lessons - Get lessons created by the logged-in teacher

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

export async function onRequestGet(context) {
  const { request, env } = context;

  try {
    const auth = request.headers.get("Authorization");
    const token = auth?.split(" ")[1];
    const user = token ? await verifyToken(token) : null;

    if (!user || user.role !== "teacher") {
      return Response.json({ error: "Teacher access only" }, { status: 403 });
    }

    // Get all lessons created by this teacher from localStorage
    // Note: This assumes lessons are stored client-side. If stored in DB, adjust query below.
    // For now, we'll return a structure that can be populated by client-side data
    
    return Response.json({
      userId: user.id,
      email: user.email,
      lessons: [] // Client will populate with lessons from localStorage where teacher === user.email
    });

  } catch (e) {
    return Response.json({ error: "Server error: " + e.message }, { status: 500 });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
