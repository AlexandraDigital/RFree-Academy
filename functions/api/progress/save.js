// functions/api/progress/save.js
// Cloudflare Pages Function — POST /api/progress/save
// Requires D1 binding named "DB" in Pages → Settings → Functions → D1 bindings

import { requireAuth, corsHeaders } from "../../_lib/auth.js";

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const user = await requireAuth(request, env);

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders });
    }

    const { lessonId, completed, watchTime } = await request.json();

    if (!lessonId) {
      return Response.json({ error: "lessonId is required." }, { status: 400, headers: corsHeaders });
    }

    await env.DB.prepare(
      `INSERT OR REPLACE INTO progress (user_id, lesson_id, completed, watch_time)
       VALUES (?, ?, ?, ?)`
    ).bind(user.id, lessonId, completed ? 1 : 0, watchTime || 0).run();

    return Response.json({ ok: true }, { headers: corsHeaders });

  } catch (e) {
    return Response.json({ error: "Server error: " + e.message }, { status: 500, headers: corsHeaders });
  }
}

export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders });
}
