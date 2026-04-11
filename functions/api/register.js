// functions/api/register.js
// Cloudflare Pages Function — POST /api/register
// Requires D1 binding named "DB" in Pages → Settings → Functions → D1 bindings

import { createToken, corsHeaders } from "../_lib/auth.js";

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json({ error: "Email and password are required." }, { status: 400, headers: corsHeaders });
    }

    // Always register as student — never trust role from client
    const existing = await env.DB.prepare(
      "SELECT id FROM users WHERE email = ?"
    ).bind(email).first();

    if (existing) {
      return Response.json({ error: "An account with this email already exists." }, { status: 409, headers: corsHeaders });
    }

    const enc = new TextEncoder().encode(password);
    const buf = await crypto.subtle.digest("SHA-256", enc);
    const hashed = [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");

    const result = await env.DB.prepare(
      "INSERT INTO users (email, password, role, created_at) VALUES (?, ?, ?, ?)"
    ).bind(email, hashed, "student", new Date().toISOString()).run();

    const newUser = { id: result.meta.last_row_id, role: "student" };
    const token = await createToken(newUser, env);

    return Response.json({ token, role: "student", userId: newUser.id }, { headers: corsHeaders });

  } catch (e) {
    return Response.json({ error: "Server error: " + e.message }, { status: 500, headers: corsHeaders });
  }
}

export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders });
}
