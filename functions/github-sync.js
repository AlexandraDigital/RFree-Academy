// Cloudflare Pages Function: /functions/github-sync.js
// Receives lessons from RFree Academy and commits them to GitHub

export async function onRequestPost(context) {
  const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  };

  try {
    // Only allow logged-in staff to trigger GitHub sync
    const { getUserFromRequest } = await import('./_lib/auth.js');
    const user = await getUserFromRequest(context.request, context.env);
    if (!user || !['admin', 'teacher'].includes(user.role)) {
      return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), { status: 401, headers: CORS });
    }

    const { files } = await context.request.json();

    // These come from Cloudflare Pages → Settings → Environment Variables
    const GITHUB_TOKEN = context.env.GITHUB_TOKEN;
    const GITHUB_REPO  = context.env.GITHUB_REPO;   // e.g. "yourname/rfree-academy"
    const GITHUB_BRANCH = context.env.GITHUB_BRANCH || 'main';

    if (!GITHUB_TOKEN || !GITHUB_REPO) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing GITHUB_TOKEN or GITHUB_REPO environment variables'
      }), { status: 500, headers: CORS });
    }

    const apiBase = `https://api.github.com/repos/${GITHUB_REPO}/contents`;
    const headers = {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      'User-Agent': 'RFree-Academy-Sync'
    };

    let synced = 0;
    const errors = [];

    for (const file of files) {
      const { repoPath, content } = file;
      const encodedContent = btoa(unescape(encodeURIComponent(content)));

      // Check if file already exists (to get its SHA for update)
      let sha = null;
      const checkRes = await fetch(`${apiBase}/${repoPath}?ref=${GITHUB_BRANCH}`, { headers });
      if (checkRes.ok) {
        const existing = await checkRes.json();
        sha = existing.sha;
      }

      const body = {
        message: `sync: update ${repoPath}`,
        content: encodedContent,
        branch: GITHUB_BRANCH,
        ...(sha ? { sha } : {})
      };

      const putRes = await fetch(`${apiBase}/${repoPath}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body)
      });

      if (putRes.ok) {
        synced++;
      } else {
        const err = await putRes.json();
        errors.push({ path: repoPath, error: err.message });
      }
    }

    return new Response(JSON.stringify({
      success: true,
      synced,
      errors,
      message: `Synced ${synced} of ${files.length} lessons to GitHub`
    }), { status: 200, headers: CORS });

  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      error: err.message
    }), { status: 500, headers: CORS });
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
