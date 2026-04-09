import React from 'react';
import { Lesson } from '../types';
import { convertToGitHubPagesUrl, isGitHubUrl } from '../utils/urlUtils';

interface LessonListProps {
  lessons: Lesson[];
  onEdit: (lesson: Lesson) => void;
  onDelete: (id: string) => void;
  isAdmin?: boolean; // When true, shows the raw GitHub URL for admin reference
}

export const LessonList: React.FC<LessonListProps> = ({
  lessons,
  onEdit,
  onDelete,
  isAdmin = false,
}) => {
  if (lessons.length === 0) {
    return (
      <div className="empty-state">
        <p>📚 No lessons yet. Click "Add Lesson" to get started!</p>
      </div>
    );
  }

  const getStudentUrl = (githubUrl: string): string => {
    // If it's a GitHub URL, convert to GitHub Pages URL
    if (isGitHubUrl(githubUrl)) {
      return convertToGitHubPagesUrl(githubUrl);
    }
    // Otherwise use as-is (already a clean URL)
    return githubUrl;
  };

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
            <div className="lesson-resource">
              {/* Students see a clean link with no GitHub branding */}
              <a
                href={getStudentUrl(lesson.githubUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-link"
              >
                📄 View Lesson Resource
              </a>

              {/* Admin-only: show the raw GitHub source URL for reference */}
              {isAdmin && (
                <div className="admin-badge">
                  <span className="admin-label">🔒 Admin:</span>{' '}
                  <a
                    href={lesson.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-source-link"
                  >
                    View GitHub Source
                  </a>
                </div>
              )}
            </div>
          )}

          <div className="lesson-actions">
            <button onClick={() => onEdit(lesson)} className="btn-secondary">
              Edit
            </button>
            <button onClick={() => onDelete(lesson.id)} className="btn-danger">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
