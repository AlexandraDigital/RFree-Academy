import { corsHeaders, requireAdmin } from "../../_lib/auth.js";

export async function onRequestGet({ request, env }) {
  const admin = await requireAdmin(request, env);
  if (!admin) {
    return Response.json({ error: "Forbidden" }, { status: 403, headers: corsHeaders });
  }

  try {
    const result = await env.DB.prepare(
      "SELECT id, email, role, created_at FROM users ORDER BY datetime(created_at) DESC, id DESC"
    ).all();

    return Response.json(result?.results || [], { headers: corsHeaders });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500, headers: corsHeaders });
  }
}

export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders });
}
