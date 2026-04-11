
// functions/api/chat.js
// Cloudflare Pages Function — POST /api/chat
// Requires GROQ_API_KEY in Pages → Settings → Environment Variables

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function onRequestPost(context) {
  const { request, env } = context;

  const apiKey = env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: { message: "GROQ_API_KEY not configured in Cloudflare environment variables." } }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
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
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders });
}
