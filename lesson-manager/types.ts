export interface Lesson {
  id: string;
  name: string;
  videoUrl: string;
  outline: string;
}

export interface LessonData {
  lessons: Lesson[];
}