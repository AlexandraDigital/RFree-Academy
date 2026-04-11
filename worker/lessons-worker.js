/**
 * RFree Academy — Lessons Worker
 * Cloudflare Worker with KV storage
 *
 * KV binding required: LESSONS_KV
 *
 * Deploy:
 *   1. wrangler kv:namespace create LESSONS_KV
 *   2. Add binding to wrangler.toml (see bottom of file)
 *   3. wrangler deploy
 *
 * Routes:
 *   GET    /api/lessons              → list all lessons (public)
 *   GET    /api/lessons/:id          → get single lesson (public)
 *   POST   /api/lessons              → create lesson (teacher/admin)
 *   PUT    /api/lessons/:id          → update lesson (owner teacher or admin)
 *   DELETE /api/lessons/:id          → delete lesson (owner teacher or admin)
 *
 * Auth:
 *   Pass Authorization: Bearer <token> header.
 *   Token is validated against your existing Worker at /api/me
 *   The /api/me endpoint must return { role, email, name }
 */

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

// ─── AUTH ────────────────────────────────────────────────────────────────────

async function getUser(request, env) {
  const authHeader = request.headers.get('Authorization') || '';
  if (!authHeader) return null;

  try {
    const workerUrl = env.WORKER_URL || 'https://rfree-academy-backend.futuresuccess105.workers.dev';
    const res = await fetch(`${workerUrl}/api/me`, {
      headers: { Authorization: authHeader },
    });
    if (!res.ok) return null;
    return await res.json(); // { role, email, name }
  } catch {
    return null;
  }
}

function canManage(user, lesson) {
  if (!user) return false;
  if (user.role === 'admin') return true;
  if (user.role === 'teacher' && lesson.teacherEmail === user.email) return true;
  return false;
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: CORS });
}

function extractYouTubeId(url) {
  if (!url) return '';
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return '';
}

// ─── HANDLERS ────────────────────────────────────────────────────────────────

async function listLessons(env) {
  const raw = await env.LESSONS_KV.get('all_lessons');
  const lessons = raw ? JSON.parse(raw) : [];
  return json(lessons);
}

async function getLesson(env, id) {
  const raw = await env.LESSONS_KV.get('all_lessons');
  const lessons = raw ? JSON.parse(raw) : [];
  const lesson = lessons.find(l => l.id === id);
  if (!lesson) return json({ error: 'Not found' }, 404);
  return json(lesson);
}

async function createLesson(request, env, user) {
  if (!user || !['admin', 'teacher'].includes(user.role)) {
    return json({ error: 'Unauthorized' }, 401);
  }

  const body = await request.json();
  const { name, videoUrl, outline, category, publishedDate, githubUrl } = body;

  if (!name || !videoUrl) {
    return json({ error: 'name and videoUrl are required' }, 400);
  }

  const videoId = extractYouTubeId(videoUrl);
  const thumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : '';

  const lesson = {
    id: `lesson_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name: name.trim(),
    videoUrl,
    videoId,
    thumbnail,
    outline: outline || '',
    category: category || 'General',
    publishedDate: publishedDate || new Date().toISOString().split('T')[0],
    githubUrl: githubUrl || '',
    teacherName: user.name || user.email,
    teacherEmail: user.email,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const raw = await env.LESSONS_KV.get('all_lessons');
  const lessons = raw ? JSON.parse(raw) : [];
  lessons.unshift(lesson);
  await env.LESSONS_KV.put('all_lessons', JSON.stringify(lessons));

  return json({ success: true, lesson }, 201);
}

async function updateLesson(request, env, user, id) {
  if (!user) return json({ error: 'Unauthorized' }, 401);

  const raw = await env.LESSONS_KV.get('all_lessons');
  const lessons = raw ? JSON.parse(raw) : [];
  const idx = lessons.findIndex(l => l.id === id);

  if (idx === -1) return json({ error: 'Not found' }, 404);
  if (!canManage(user, lessons[idx])) return json({ error: 'Forbidden' }, 403);

  const body = await request.json();
  const { name, videoUrl, outline, category, publishedDate, githubUrl } = body;

  // Recalculate videoId/thumbnail if URL changed
  const videoId = videoUrl ? extractYouTubeId(videoUrl) : lessons[idx].videoId;
  const thumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : lessons[idx].thumbnail;

  lessons[idx] = {
    ...lessons[idx],
    ...(name && { name: name.trim() }),
    ...(videoUrl && { videoUrl, videoId, thumbnail }),
    ...(outline !== undefined && { outline }),
    ...(category && { category }),
    ...(publishedDate && { publishedDate }),
    ...(githubUrl !== undefined && { githubUrl }),
    updatedAt: new Date().toISOString(),
  };

  await env.LESSONS_KV.put('all_lessons', JSON.stringify(lessons));
  return json({ success: true, lesson: lessons[idx] });
}

async function deleteLesson(env, user, id) {
  if (!user) return json({ error: 'Unauthorized' }, 401);

  const raw = await env.LESSONS_KV.get('all_lessons');
  const lessons = raw ? JSON.parse(raw) : [];
  const lesson = lessons.find(l => l.id === id);

  if (!lesson) return json({ error: 'Not found' }, 404);
  if (!canManage(user, lesson)) return json({ error: 'Forbidden' }, 403);

  const updated = lessons.filter(l => l.id !== id);
  await env.LESSONS_KV.put('all_lessons', JSON.stringify(updated));
  return json({ success: true });
}

// ─── ROUTER ──────────────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // GET /api/lessons
    if (request.method === 'GET' && path === '/api/lessons') {
      return listLessons(env);
    }

    // GET /api/lessons/:id
    const singleMatch = path.match(/^\/api\/lessons\/([^/]+)$/);
    if (request.method === 'GET' && singleMatch) {
      return getLesson(env, singleMatch[1]);
    }

    // POST /api/lessons
    if (request.method === 'POST' && path === '/api/lessons') {
      const user = await getUser(request, env);
      return createLesson(request, env, user);
    }

    // PUT /api/lessons/:id
    if (request.method === 'PUT' && singleMatch) {
      const user = await getUser(request, env);
      return updateLesson(request, env, user, singleMatch[1]);
    }

    // DELETE /api/lessons/:id
    if (request.method === 'DELETE' && singleMatch) {
      const user = await getUser(request, env);
      return deleteLesson(env, user, singleMatch[1]);
    }

    return json({ error: 'Not found' }, 404);
  },
};

/**
 * ─── wrangler.toml (add to your existing config) ───────────────────────────
 *
 * name = "rfree-lessons"
 * main = "worker/lessons-worker.js"
 * compatibility_date = "2024-01-01"
 *
 * [[kv_namespaces]]
 * binding = "LESSONS_KV"
 * id = "PASTE_YOUR_KV_NAMESPACE_ID_HERE"
 *
 * [vars]
 * WORKER_URL = "https://rfree-academy-backend.futuresuccess105.workers.dev"
 *
 * ─── Deploy commands ───────────────────────────────────────────────────────
 * npx wrangler kv:namespace create LESSONS_KV
 * npx wrangler deploy
 */
