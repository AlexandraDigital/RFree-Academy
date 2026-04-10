import { corsHeaders, getUserFromRequest } from "../_lib/auth.js";

export async function onRequestGet({ request, env }) {
  const user = await getUserFromRequest(request, env);

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders });
  }

  return Response.json(
    { id: user.id, email: user.email, role: user.role, created_at: user.created_at },
    { headers: corsHeaders }
  );
}

export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders });
}
