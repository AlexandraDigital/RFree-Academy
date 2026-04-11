// functions/api/login.js
// Cloudflare Pages Function — POST /api/login
// Requires D1 binding named "DB" in Pages → Settings → Functions → D1 bindings

import { createToken, corsHeaders } from "../_lib/auth.js";

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json({ error: "Email and password are required." }, { status: 400, headers: corsHeaders });
    }

    const enc = new TextEncoder().encode(password);
    const buf = await crypto.subtle.digest("SHA-256", enc);
    const hashed = [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");

    // Fetch by email first, then compare hash — avoids column name ambiguity
    const user = await env.DB.prepare(
      "SELECT * FROM users WHERE email = ?"
    ).bind(email).first();

    if (!user || user.password !== hashed) {
      return Response.json({ error: "Invalid email or password." }, { status: 401, headers: corsHeaders });
    }

    const token = await createToken(user, env);

    return Response.json({ token, role: user.role, userId: user.id }, { headers: corsHeaders });

  } catch (e) {
    return Response.json({ error: "Server error: " + e.message }, { status: 500, headers: corsHeaders });
  }
}

export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders });
}
