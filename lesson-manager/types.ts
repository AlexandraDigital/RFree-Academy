export interface Lesson {
  id: string;
  name: string;
  video_url: string;
  video_id: string;
  thumbnail: string;
  outline: string;
  category: string;
  published_date: string;
  github_url?: string;
  teacher_name: string;
  teacher_email: string;
  created_at: string;
  updated_at: string;
}

export interface LessonData {
  lessons: Lesson[];
}
