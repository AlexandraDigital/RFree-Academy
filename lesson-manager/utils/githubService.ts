import { Lesson, LessonData } from '../types';

const GITHUB_OWNER = 'AlexandraDigital';
const GITHUB_REPO = 'RFree-Academy';
const LESSONS_FILE = 'lesson-manager/lessons.json';

export const githubService = {
  async fetchLessons(): Promise<Lesson[]> {
    try {
      const response = await (window as any).bridge('github_get_file_content', {
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        repoPath: LESSONS_FILE,
      });

      if (response && response.content) {
        const data = JSON.parse(response.content) as LessonData;
        return data.lessons || [];
      }
      return [];
    } catch (error) {
      console.log('lessons.json not found, starting fresh');
      return [];
    }
  },

  async saveLessons(lessons: Lesson[]): Promise<void> {
    const data: LessonData = { lessons };
    const content = JSON.stringify(data, null, 2);

    try {
      await (window as any).bridge('github_push_to_branch', {
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        branch: 'main',
        commitMessage: `Update lessons: ${new Date().toISOString()}`,
        files: [
          {
            repoPath: LESSONS_FILE,
            content,
          },
        ],
      });
    } catch (error) {
      console.error('Failed to save lessons to GitHub:', error);
      throw error;
    }
  },
};