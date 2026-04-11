// functions/api/teacher/my-students.js
// GET /api/teacher/my-students - Get list of students who took this teacher's lessons

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

    // Get all unique students who have progress on any lesson
    // In a full implementation, you'd filter by lessons the teacher created
    // For now, return all students for the teacher to manage
    
    const studentsResult = await env.DB.prepare(`
      SELECT DISTINCT u.id, u.email, u.display_name, COUNT(p.lesson_id) as lessons_taken
      FROM users u
      LEFT JOIN progress p ON u.id = p.user_id
      WHERE u.role = 'student'
      GROUP BY u.id, u.email, u.display_name
      ORDER BY u.email
    `).all();

    return Response.json({
      students: studentsResult.results || []
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
