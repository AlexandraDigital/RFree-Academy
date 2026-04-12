import { Lesson } from '../types';

const DEFAULT_WORKER_URL = 'https://rfree-academy-backend.futuresuccess105.workers.dev';

function getWorkerUrl(): string {
  return (typeof localStorage !== 'undefined' && localStorage.getItem('rfree_worker_url')) || DEFAULT_WORKER_URL;
}

function getAuthHeader(): Record<string, string> {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('rfree_token') : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const workerService = {
  async fetchLessons(): Promise<Lesson[]> {
    const res = await fetch(`${getWorkerUrl()}/api/lessons`);
    if (!res.ok) throw new Error('Failed to fetch lessons');
    return res.json();
  },

  // FIXED: Calls the new courses API with the correct ID parameter
  async deleteCourse(id: string): Promise<void> {
    const res = await fetch(`${getWorkerUrl()}/api/courses?id=${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as any).error || 'Failed to delete course');
    }
  },

  // FIXED: Calls the new lessons API with the correct ID parameter
  async deleteLesson(id: string): Promise<void> {
    const res = await fetch(`${getWorkerUrl()}/api/lessons?id=${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as any).error || 'Failed to delete lesson');
    }
  }
};
