import { Lesson } from '../types';

// ─── CONFIG ──────────────────────────────────────────────────────────────────
// Set this to your deployed Worker URL.
// You can override it at runtime via localStorage key: rfree_worker_url
const DEFAULT_WORKER_URL = 'https://rfree-academy-backend.futuresuccess105.workers.dev';

function getWorkerUrl(): string {
  return (
    (typeof localStorage !== 'undefined' && localStorage.getItem('rfree_worker_url')) ||
    DEFAULT_WORKER_URL
  );
}

function getAuthHeader(): Record<string, string> {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('rfree_token') : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ─── YouTube helpers (client-side, so form can preview instantly) ─────────────
export function extractYouTubeId(url: string): string {
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

export function youTubeThumbnail(videoId: string): string {
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';
}

// ─── API ─────────────────────────────────────────────────────────────────────
export const workerService = {
  async fetchLessons(): Promise<Lesson[]> {
    const res = await fetch(`${getWorkerUrl()}/api/lessons`);
    if (!res.ok) throw new Error('Failed to fetch lessons');
    return res.json();
  },

  async createLesson(data: Omit<Lesson, 'id' | 'videoId' | 'thumbnail' | 'teacherName' | 'teacherEmail' | 'createdAt' | 'updatedAt'>): Promise<Lesson> {
    const res = await fetch(`${getWorkerUrl()}/api/lessons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as any).error || 'Failed to create lesson');
    }
    const { lesson } = await res.json();
    return lesson;
  },

  async updateLesson(id: string, data: Partial<Lesson>): Promise<Lesson> {
    const res = await fetch(`${getWorkerUrl()}/api/lessons/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as any).error || 'Failed to update lesson');
    }
    const { lesson } = await res.json();
    return lesson;
  },

  async deleteLesson(id: string): Promise<void> {
    const res = await fetch(`${getWorkerUrl()}/api/lessons/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as any).error || 'Failed to delete lesson');
    }
  },
};
