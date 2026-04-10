export async function onRequestGet({ request, env }) {
  const auth = request.headers.get("Authorization");

  if (!auth) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = auth.split(" ")[1];

  const user = await verifyToken(token, env);

  if (!user) {
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }

  const fullUser = await env.DB.prepare(
    "SELECT id, email, role FROM users WHERE id = ?"
  ).bind(user.id).first();

  return Response.json(fullUser);
}
