export async function onRequestPost({ request, env }) {
  try {
    const { email, secretKey } = await request.json();

    // Security: Use a secret key to prevent abuse
    const EMERGENCY_KEY = env.EMERGENCY_RESET_KEY || "emergency-reset-2026";
    
    if (secretKey !== EMERGENCY_KEY) {
      return new Response(JSON.stringify({ error: "Invalid secret key" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!email) {
      return new Response(JSON.stringify({ error: "Email required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Connect to D1
    const db = env.DB;
    
    // Reset user role to admin
    const result = await db
      .prepare("UPDATE users SET role = ? WHERE email = ?")
      .bind("admin", email)
      .run();

    if (result.success && result.meta.changes > 0) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `User ${email} reset to admin role` 
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ error: "User not found or no changes made" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
