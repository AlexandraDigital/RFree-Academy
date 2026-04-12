export async function onRequestDelete(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  
  // This looks for an ?id=... in the URL
  const id = url.searchParams.get('id'); 

  if (!id) {
    return new Response(JSON.stringify({ error: "No ID provided" }), { status: 400 });
  }

  try {
    // THE FIX: We use 'id' here because your table doesn't have 'course_id'
    await env.DB.prepare("DELETE FROM courses WHERE id = ?")
      .bind(id)
      .run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
