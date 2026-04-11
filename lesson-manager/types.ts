export interface Lesson {
  id: string;
  name: string;
  videoUrl: string;
  videoId: string;          // Auto-extracted YouTube video ID
  thumbnail: string;        // https://img.youtube.com/vi/{videoId}/hqdefault.jpg
  outline: string;
  category: string;
  publishedDate: string;    // YYYY-MM-DD
  githubUrl?: string;
  teacherName: string;
  teacherEmail: string;
  createdAt: string;
  updatedAt: string;
}

export interface LessonData {
  lessons: Lesson[];
}
