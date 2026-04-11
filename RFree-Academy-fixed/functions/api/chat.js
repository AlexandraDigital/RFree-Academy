// functions/api/chat.js
// Cloudflare Pages Function — POST /api/chat
// Requires GROQ_API_KEY in Pages → Settings → Environment Variables
// Requires D1 binding named "DB" for auth

import { requireAuth, corsHeaders } from "../_lib/auth.js";

export async function onRequestPost(context) {
  const { request, env } = context;

  // Only allow logged-in users to use the chat proxy
  const user = await requireAuth(request, env);
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders });
  }

  const apiKey = env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: { message: "GROQ_API_KEY not configured in Cloudflare environment variables." } },
      { status: 500, headers: corsHeaders }
    );
  }

  const body = await request.text();

  const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body,
  });

  const data = await groqResponse.text();

  return new Response(data, {
    status: groqResponse.status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
    },
  });
}

export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders });
}
