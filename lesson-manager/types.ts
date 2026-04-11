export interface Lesson {
  id: string;
  name: string;
  videoUrl: string;
  outline: string;
  githubUrl?: string;
}

export interface LessonData {
  lessons: Lesson[];
}