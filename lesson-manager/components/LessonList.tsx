import React from 'react';
import { Lesson } from '../types';

interface LessonListProps {
  lessons: Lesson[];
  onEdit: (lesson: Lesson) => void;
  onDelete: (id: string) => void;
}

export const LessonList: React.FC<LessonListProps> = ({ lessons, onEdit, onDelete }) => {
  if (lessons.length === 0) {
    return (
      <div className="empty-state">
        <p>📚 No lessons yet. Click "Add Lesson" to get started!</p>
      </div>
    );
  }

  return (
    <div className="lesson-grid">
      {lessons.map((lesson) => (
        <div key={lesson.id} className="lesson-card">
          <div className="lesson-header">
            <a
              href={lesson.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="lesson-name"
            >
              🎥 {lesson.name}
            </a>
          </div>
          <div className="lesson-outline">
            <p>{lesson.outline}</p>
          </div>
          {lesson.githubUrl && (
            <div className="lesson-github">
              <a
                href={lesson.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
              >
                🔗 View on GitHub
              </a>
            </div>
          )}
          <div className="lesson-actions">
            <button
              onClick={() => onEdit(lesson)}
              className="btn-secondary"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(lesson.id)}
              className="btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};