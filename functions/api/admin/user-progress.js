// functions/api/admin/user-progress.js
// GET  /api/admin/user-progress?userId=X  → returns all track progress for a user
// POST /api/admin/user-progress            → toggles a single lesson for a user

import { requireAdmin, corsHeaders } from "../../_lib/auth.js";

// GET — load all track progress for a student
export async function onRequestGet(context) {
  const { request, env } = context;

  const admin = await requireAdmin(request, env);
  if (!admin) return Response.json({ error: "Forbidden" }, { status: 403, headers: corsHeaders });

  const userId = new URL(request.url).searchParams.get("userId");
  if (!userId) return Response.json({ error: "userId required" }, { status: 400, headers: corsHeaders });

  try {
    const rows = await env.DB.prepare(
      "SELECT lesson_id, completed FROM progress WHERE user_id = ?"
    ).bind(userId).all();

    // lesson_id format: "track_financial_0", "track_financial_1", etc.
    const progress = {};
    for (const row of rows.results) {
      if (!row.lesson_id.startsWith("track_")) continue;
      const parts = row.lesson_id.split("_");
      const index = parseInt(parts[parts.length - 1]);
      const trackId = parts.slice(1, parts.length - 1).join("_");
      if (!progress[trackId]) progress[trackId] = [];
      if (row.completed && !progress[trackId].includes(index)) {
        progress[trackId].push(index);
      }
    }

    return Response.json({ progress }, { headers: corsHeaders });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500, headers: corsHeaders });
  }
}

// POST — mark a specific lesson complete or incomplete for a student
export async function onRequestPost(context) {
  const { request, env } = context;

  const admin = await requireAdmin(request, env);
  if (!admin) return Response.json({ error: "Forbidden" }, { status: 403, headers: corsHeaders });

  try {
    const { userId, trackId, lessonIndex, completed } = await request.json();
    if (!userId || !trackId || lessonIndex === undefined) {
      return Response.json({ error: "userId, trackId, lessonIndex required" }, { status: 400, headers: corsHeaders });
    }

    const lessonId = `track_${trackId}_${lessonIndex}`;

    await env.DB.prepare(
      `INSERT OR REPLACE INTO progress (user_id, lesson_id, completed, watch_time)
       VALUES (?, ?, ?, ?)`
    ).bind(userId, lessonId, completed ? 1 : 0, 0).run();

    return Response.json({ ok: true }, { headers: corsHeaders });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500, headers: corsHeaders });
  }
}

export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders });
}
