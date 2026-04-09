import React from 'react';

interface HeaderProps {
  onAddLesson: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
  lessonCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onAddLesson, onExport, onImport, lessonCount }) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
    }
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-title">
          <h1>📚 Lesson Directory</h1>
          <p>{lessonCount} lesson{lessonCount !== 1 ? 's' : ''}</p>
        </div>
        <div className="header-actions">
          <button onClick={onAddLesson} className="btn-primary">
            ➕ Add Lesson
          </button>
          <button onClick={onExport} className="btn-secondary">
            📥 Export
          </button>
          <label className="btn-secondary" style={{ cursor: 'pointer', marginBottom: 0 }}>
            📤 Import
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </div>
    </header>
  );
};