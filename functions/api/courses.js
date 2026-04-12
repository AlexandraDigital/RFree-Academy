export async function onRequestDelete(context) {
  const { env, params } = context;
  // This 'id' comes from the URL (e.g., /api/courses/123)
  const courseId = params.id; 

  try {
    // The fix: Use 'id' here because that's what is in your courses table
    await env.DB.prepare("DELETE FROM courses WHERE id = ?")
      .bind(courseId)
      .run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}
