// functions/api/admin/user-progress.js
// GET  /api/admin/user-progress?userId=X  → returns all track progress for a user
// POST /api/admin/user-progress            → toggles a single lesson for a user

import { verifyToken } from "../../auth.js";

async function hashStr(str) {
  const enc = new TextEncoder().encode(str);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}

async function getAdmin(req) {
  const auth = req.headers.get("Authorization");
  const token = auth?.split(" ")[1];
  if (!token) return null;
  try {
    const SECRET = "rfree-academy";
    const [base, signature] = token.split(".");
    if (!base || !signature) return null;
    const valid = await hashStr(base + SECRET);
    if (valid !== signature) return null;
    const payload = JSON.parse(atob(base));
    if (payload.exp < Date.now()) return null;
    if (payload.role !== "admin") return null;
    return payload;
  } catch { return null; }
}

// GET — load all track progress for a student
export async function onRequestGet(context) {
  const { request, env } = context;

  const admin = await getAdmin(request);
  if (!admin) return Response.json({ error: "Forbidden" }, { status: 403 });

  const userId = new URL(request.url).searchParams.get("userId");
  if (!userId) return Response.json({ error: "userId required" }, { status: 400 });

  try {
    // Fetch all track-lesson progress rows for this user
    const rows = await env.DB.prepare(
      "SELECT lesson_id, completed FROM progress WHERE user_id = ?"
    ).bind(userId).all();

    // lesson_id format: "track_financial_0", "track_financial_1", etc.
    const progress = {};
    for (const row of rows.results) {
      if (!row.lesson_id.startsWith("track_")) continue;
      const parts = row.lesson_id.split("_");
      // track_{trackId}_{index}  — trackId may contain underscores, index is last part
      const index = parseInt(parts[parts.length - 1]);
      const trackId = parts.slice(1, parts.length - 1).join("_");
      if (!progress[trackId]) progress[trackId] = [];
      if (row.completed && !progress[trackId].includes(index)) {
        progress[trackId].push(index);
      }
    }

    return Response.json({ progress });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

// POST — mark a specific lesson complete or incomplete for a student
export async function onRequestPost(context) {
  const { request, env } = context;

  const admin = await getAdmin(request);
  if (!admin) return Response.json({ error: "Forbidden" }, { status: 403 });

  try {
    const { userId, trackId, lessonIndex, completed } = await request.json();
    if (!userId || !trackId || lessonIndex === undefined) {
      return Response.json({ error: "userId, trackId, lessonIndex required" }, { status: 400 });
    }

    const lessonId = `track_${trackId}_${lessonIndex}`;

    await env.DB.prepare(
      `INSERT OR REPLACE INTO progress (user_id, lesson_id, completed, watch_time)
       VALUES (?, ?, ?, ?)`
    ).bind(userId, lessonId, completed ? 1 : 0, 0).run();

    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
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
