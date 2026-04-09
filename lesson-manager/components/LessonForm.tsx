import React, { useState, useEffect } from 'react';
import { Lesson } from '../types';

interface LessonFormProps {
  lesson?: Lesson;
  onSave: (lesson: Lesson) => void;
  onCancel: () => void;
}

export const LessonForm: React.FC<LessonFormProps> = ({ lesson, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [outline, setOutline] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (lesson) {
      setName(lesson.name);
      setVideoUrl(lesson.videoUrl);
      setOutline(lesson.outline);
    }
  }, [lesson]);

  const validateForm = () => {
    const newErrors: string[] = [];
    if (!name.trim()) newErrors.push('Lesson name is required');
    if (!videoUrl.trim()) newErrors.push('Video URL is required');
    if (!outline.trim()) newErrors.push('Outline is required');
    if (videoUrl && !isValidUrl(videoUrl)) newErrors.push('Invalid URL format');
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newLesson: Lesson = {
      id: lesson?.id || Date.now().toString(),
      name,
      videoUrl,
      outline,
    };
    onSave(newLesson);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{lesson ? 'Edit Lesson' : 'Add New Lesson'}</h2>
        
        {errors.length > 0 && (
          <div className="errors">
            {errors.map((error, idx) => (
              <p key={idx} className="error-msg">❌ {error}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Lesson Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Introduction to Budgeting"
            />
          </div>

          <div className="form-group">
            <label>Video URL *</label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>

          <div className="form-group">
            <label>Outline / Description *</label>
            <textarea
              value={outline}
              onChange={(e) => setOutline(e.target.value)}
              placeholder="Key topics and lesson summary..."
              rows={5}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {lesson ? 'Update Lesson' : 'Create Lesson'}
            </button>
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};