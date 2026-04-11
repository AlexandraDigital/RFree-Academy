import { corsHeaders, requireAdmin } from "../../_lib/auth.js";

const ALLOWED_ROLES = new Set(["student", "teacher", "admin"]);

export async function onRequestPost({ request, env }) {
  const admin = await requireAdmin(request, env);
  if (!admin) {
    return Response.json({ error: "Forbidden" }, { status: 403, headers: corsHeaders });
  }

  try {
    const { userId, role, action } = await request.json();

    if (!userId) {
      return Response.json({ error: "Valid userId is required." }, { status: 400, headers: corsHeaders });
    }

    const existing = await env.DB.prepare(
      "SELECT id, role FROM users WHERE id = ?"
    ).bind(userId).first();

    if (!existing) {
      return Response.json({ error: "User not found." }, { status: 404, headers: corsHeaders });
    }

    // If action is 'reset', always set to 'admin'. Otherwise validate and set the requested role.
    let newRole = role;
    if (action === "reset") {
      newRole = "admin";
    } else if (!ALLOWED_ROLES.has(role)) {
      return Response.json({ error: "Valid role is required." }, { status: 400, headers: corsHeaders });
    }

    await env.DB.prepare(
      "UPDATE users SET role = ? WHERE id = ?"
    ).bind(newRole, userId).run();

    return Response.json({ ok: true, userId: Number(userId), role: newRole }, { headers: corsHeaders });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500, headers: corsHeaders });
  }
}

export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders });
}
