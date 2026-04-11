// functions/api/teacher/student-progress.js
// GET /api/teacher/student-progress?studentId={id} - Get a student's progress on teacher's lessons
// POST /api/teacher/student-progress - Teacher marks student progress as complete

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

    const url = new URL(request.url);
    const studentId = url.searchParams.get("studentId");

    if (!studentId) {
      return Response.json({ error: "studentId required" }, { status: 400 });
    }

    // Get student progress on lessons
    const progress = await env.DB.prepare(`
      SELECT p.lesson_id, p.completed, p.watch_time
      FROM progress p
      WHERE p.user_id = ?
    `).bind(studentId).all();

    return Response.json({
      studentId,
      progress: progress.results || []
    });

  } catch (e) {
    return Response.json({ error: "Server error: " + e.message }, { status: 500 });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const auth = request.headers.get("Authorization");
    const token = auth?.split(" ")[1];
    const user = token ? await verifyToken(token) : null;

    if (!user || user.role !== "teacher") {
      return Response.json({ error: "Teacher access only" }, { status: 403 });
    }

    const { studentId, lessonId, completed } = await request.json();

    if (!studentId || !lessonId) {
      return Response.json({ error: "studentId and lessonId required" }, { status: 400 });
    }

    // Teacher marks student progress
    await env.DB.prepare(`
      INSERT OR REPLACE INTO progress (user_id, lesson_id, completed, watch_time)
      VALUES (?, ?, ?, ?)
    `).bind(studentId, lessonId, completed ? 1 : 0, 100).run();

    return Response.json({ ok: true, message: `Student progress updated` });

  } catch (e) {
    return Response.json({ error: "Server error: " + e.message }, { status: 500 });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
