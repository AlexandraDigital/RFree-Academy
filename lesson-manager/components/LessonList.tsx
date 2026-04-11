import React from 'react';
import { Lesson } from '../types';
import { convertToGitHubPagesUrl, isGitHubUrl } from '../utils/urlUtils';

interface LessonListProps {
  lessons: Lesson[];
  onEdit: (lesson: Lesson) => void;
  onDelete: (id: string) => void;
  isAdmin?: boolean;
  userEmail?: string;
  userRole?: string;
}

export const LessonList: React.FC<LessonListProps> = ({
  lessons, onEdit, onDelete, isAdmin = false, userEmail, userRole,
}) => {
  if (lessons.length === 0) {
    return <div className="empty-state"><p>📚 No lessons yet. Click "Add Lesson" to get started!</p></div>;
  }

  const canManage = (lesson: Lesson) =>
    userRole === 'admin' || lesson.teacherEmail === userEmail;

  return (
    <div className="lesson-grid">
      {lessons.map((lesson) => (
        <div key={lesson.id} className="lesson-card">

          {/* Thumbnail */}
          {lesson.thumbnail && (
            <a href={lesson.videoUrl} target="_blank" rel="noopener noreferrer">
              <img
                src={lesson.thumbnail}
                alt={lesson.name}
                style={{ width: '100%', borderRadius: 8, marginBottom: 8, display: 'block' }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </a>
          )}

          <div className="lesson-header">
            <a href={lesson.videoUrl} target="_blank" rel="noopener noreferrer" className="lesson-name">
              🎥 {lesson.name}
            </a>
          </div>

          <div style={{ fontSize: '0.78rem', color: '#aaa', marginBottom: 6, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {lesson.category && <span>📂 {lesson.category}</span>}
            {lesson.publishedDate && <span>📅 {lesson.publishedDate}</span>}
            <span>👤 {lesson.teacherName}</span>
          </div>

          <div className="lesson-outline"><p>{lesson.outline}</p></div>

          {lesson.githubUrl && (
            <div className="lesson-resource">
              <a
                href={isGitHubUrl(lesson.githubUrl) ? convertToGitHubPagesUrl(lesson.githubUrl) : lesson.githubUrl}
                target="_blank" rel="noopener noreferrer" className="resource-link"
              >
                📄 View Lesson Resource
              </a>
              {isAdmin && (
                <div className="admin-badge">
                  <span className="admin-label">🔒</span>{' '}
                  <a href={lesson.githubUrl} target="_blank" rel="noopener noreferrer" className="github-source-link">
                    GitHub Source
                  </a>
                </div>
              )}
            </div>
          )}

          {canManage(lesson) && (
            <div className="lesson-actions">
              <button onClick={() => onEdit(lesson)} className="btn-secondary">Edit</button>
              <button onClick={() => onDelete(lesson.id)} className="btn-danger">Delete</button>
            </div>
          )}

          {!canManage(lesson) && (
            <div className="lesson-actions">
              <button onClick={() => onEdit(lesson)} className="btn-secondary">👁 View</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
