import React, { useState, useEffect } from 'react';
import { Lesson } from '../types';
import { extractYouTubeId, youTubeThumbnail } from '../utils/workerService';

const CATEGORIES = [
  'General', 'Financial Literacy', 'Biblical Discipleship', 'Life Skills',
  'Legal Literacy', 'Health & Wellness', 'Career & Workforce', 'Technology',
  'Entrepreneurship', 'Family & Parenting',
];

interface LessonFormProps {
  lesson?: Lesson;
  onSave: (data: Partial<Lesson>) => void;
  onCancel: () => void;
  saving?: boolean;
  userRole?: string;   // 'admin' | 'teacher'
  userEmail?: string;
}

export const LessonForm: React.FC<LessonFormProps> = ({
  lesson, onSave, onCancel, saving, userRole, userEmail,
}) => {
  const [name, setName] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [outline, setOutline] = useState('');
  const [category, setCategory] = useState('General');
  const [publishedDate, setPublishedDate] = useState(new Date().toISOString().split('T')[0]);
  const [githubUrl, setGithubUrl] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  // Derived
  const videoId = extractYouTubeId(videoUrl);
  const thumbnail = youTubeThumbnail(videoId);

  useEffect(() => {
    if (lesson) {
      setName(lesson.name);
      setVideoUrl(lesson.videoUrl);
      setOutline(lesson.outline);
      setCategory(lesson.category || 'General');
      setPublishedDate(lesson.publishedDate || new Date().toISOString().split('T')[0]);
      setGithubUrl(lesson.githubUrl || '');
    }
  }, [lesson]);

  // Teachers can only edit their own lessons
  const isOwner = !lesson || userRole === 'admin' || lesson.teacherEmail === userEmail;

  const validate = () => {
    const errs: string[] = [];
    if (!name.trim()) errs.push('Lesson name is required');
    if (!videoUrl.trim()) errs.push('YouTube URL is required');
    if (!videoId) errs.push('Could not extract a YouTube video ID — check the URL');
    if (!outline.trim()) errs.push('Outline is required');
    setErrors(errs);
    return errs.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !isOwner) return;
    onSave({ name: name.trim(), videoUrl, outline, category, publishedDate, githubUrl: githubUrl.trim() || undefined });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: 560, width: '100%' }}>
        <h2>{lesson ? 'Edit Lesson' : 'Add New Lesson'}</h2>

        {!isOwner && (
          <div className="errors">
            <p className="error-msg">⚠️ You can only edit your own lessons.</p>
          </div>
        )}

        {errors.length > 0 && (
          <div className="errors">
            {errors.map((e, i) => <p key={i} className="error-msg">❌ {e}</p>)}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Lesson Name */}
          <div className="form-group">
            <label>Lesson Name *</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g., Introduction to Budgeting"
              disabled={!isOwner}
            />
          </div>

          {/* YouTube URL + live preview */}
          <div className="form-group">
            <label>YouTube URL *</label>
            <input
              type="url"
              value={videoUrl}
              onChange={e => setVideoUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              disabled={!isOwner}
            />
            {videoId && (
              <div style={{ marginTop: 8, display: 'flex', gap: 10, alignItems: 'center' }}>
                <img
                  src={thumbnail}
                  alt="Thumbnail preview"
                  style={{ width: 120, borderRadius: 6, border: '1px solid #444' }}
                />
                <div style={{ fontSize: '0.8rem', color: '#aaa' }}>
                  <div>✅ Video ID detected</div>
                  <code style={{ fontSize: '0.75rem' }}>{videoId}</code>
                </div>
              </div>
            )}
          </div>

          {/* Category */}
          <div className="form-group">
            <label>Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} disabled={!isOwner}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Published Date */}
          <div className="form-group">
            <label>Published Date</label>
            <input
              type="date"
              value={publishedDate}
              onChange={e => setPublishedDate(e.target.value)}
              disabled={!isOwner}
            />
          </div>

          {/* Source / GitHub URL (admin only label) */}
          <div className="form-group">
            <label>
              🔒 Source File URL
              <span style={{ fontSize: '0.75rem', color: '#888', marginLeft: 6 }}>
                (optional — your GitHub file link, hidden from students)
              </span>
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={e => setGithubUrl(e.target.value)}
              placeholder="https://github.com/AlexandraDigital/RFree-Academy/blob/main/..."
              disabled={!isOwner}
            />
          </div>

          {/* Outline */}
          <div className="form-group">
            <label>Outline / Description *</label>
            <textarea
              value={outline}
              onChange={e => setOutline(e.target.value)}
              placeholder="Key topics and lesson summary..."
              rows={5}
              disabled={!isOwner}
            />
          </div>

          <div className="form-actions">
            {isOwner && (
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? 'Saving...' : lesson ? 'Update Lesson' : 'Create Lesson'}
              </button>
            )}
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
