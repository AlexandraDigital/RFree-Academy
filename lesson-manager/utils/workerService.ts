import { Lesson } from '../types';

// Update this to your Worker URL if different
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

export const workerService = {
  async fetchLessons(): Promise<Lesson[]> {
    const res = await fetch(`${getWorkerUrl()}/api/lesson-manager`);
    if (!res.ok) throw new Error('Failed to fetch lessons');
    return res.json();
  },

  async createLesson(data: Partial<Lesson>): Promise<Lesson> {
    const res = await fetch(`${getWorkerUrl()}/api/lesson-manager`, {
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
    const res = await fetch(`${getWorkerUrl()}/api/lesson-manager/${id}`, {
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
    const res = await fetch(`${getWorkerUrl()}/api/lesson-manager/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as any).error || 'Failed to delete lesson');
    }
  },
};
