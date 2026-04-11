// functions/api/login.js
// Cloudflare Pages Function — POST /api/login
// Requires D1 binding named "DB" in Pages → Settings → Functions → D1 bindings

async function createToken(user) {
  const SECRET = "rfree-academy";
  const payload = {
    id: user.id,
    role: user.role,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000
  };
  const base = btoa(JSON.stringify(payload));
  
  // Simple SHA-256 for token signing
  const enc = new TextEncoder().encode(base + SECRET);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  const signature = [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
  
  return `${base}.${signature}`;
}

// Simple bcrypt hash comparison function
// This function compares a plaintext password against a bcrypt hash
async function verifyBcryptPassword(password, hash) {
  // Import bcryptjs dynamically
  const bcryptjs = await import('bcryptjs');
  return bcryptjs.compare(password, hash);
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json({ error: "Email and password are required." }, { status: 400 });
    }

    const user = await env.DB.prepare(
      "SELECT * FROM users WHERE email = ?"
    ).bind(email).first();

    if (!user) {
      return Response.json({ error: "Invalid email or password." }, { status: 401 });
    }

    // Verify bcrypt password
    const passwordMatch = await verifyBcryptPassword(password, user.password);

    if (!passwordMatch) {
      return Response.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const token = await createToken(user);

    return Response.json({ token, role: user.role, userId: user.id });

  } catch (e) {
    return Response.json({ error: "Server error: " + e.message }, { status: 500 });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
