import { corsHeaders, requireAdmin } from "../../_lib/auth.js";

export async function onRequestPost({ request, env }) {
  const admin = await requireAdmin(request, env);
  if (!admin) {
    return Response.json({ error: "Forbidden" }, { status: 403, headers: corsHeaders });
  }

  try {
    const { userId } = await request.json();

    if (!userId) {
      return Response.json({ error: "userId is required." }, { status: 400, headers: corsHeaders });
    }

    if (Number(userId) === Number(admin.id)) {
      return Response.json({ error: "You cannot delete your own admin account." }, { status: 400, headers: corsHeaders });
    }

    await env.DB.prepare("DELETE FROM progress WHERE user_id = ?").bind(userId).run();
    const result = await env.DB.prepare("DELETE FROM users WHERE id = ?").bind(userId).run();

    if (!result?.meta?.changes) {
      return Response.json({ error: "User not found." }, { status: 404, headers: corsHeaders });
    }

    return Response.json({ ok: true, userId: Number(userId) }, { headers: corsHeaders });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500, headers: corsHeaders });
  }
}

export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders });
}
