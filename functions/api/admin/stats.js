import { corsHeaders, requireAdmin } from "../../_lib/auth.js";

export async function onRequestGet({ request, env }) {
  const admin = await requireAdmin(request, env);
  if (!admin) {
    return Response.json({ error: "Forbidden" }, { status: 403, headers: corsHeaders });
  }

  try {
    const [usersRow, adminsRow, teachersRow, lessonsRow] = await Promise.all([
      env.DB.prepare("SELECT COUNT(*) AS count FROM users").first(),
      env.DB.prepare("SELECT COUNT(*) AS count FROM users WHERE role = 'admin'").first(),
      env.DB.prepare("SELECT COUNT(*) AS count FROM users WHERE role = 'teacher'").first(),
      env.DB.prepare("SELECT COUNT(*) AS count FROM progress WHERE completed = 1").first(),
    ]);

    return Response.json({
      totalUsers: Number(usersRow?.count || 0),
      totalAdmins: Number(adminsRow?.count || 0),
      totalTeachers: Number(teachersRow?.count || 0),
      completedLessons: Number(lessonsRow?.count || 0),
    }, { headers: corsHeaders });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500, headers: corsHeaders });
  }
}

export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders });
}
