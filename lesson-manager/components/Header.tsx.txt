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
      // Reset so the same file can be re-imported
      e.target.value = '';
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
            <span className="btn-icon">➕</span>
            <span className="btn-label">Add Lesson</span>
          </button>
          <button onClick={onExport} className="btn-secondary">
            <span className="btn-icon">📥</span>
            <span className="btn-label">Export</span>
          </button>
          <label className="btn-secondary" style={{ cursor: 'pointer' }}>
            <span className="btn-icon">📤</span>
            <span className="btn-label">Import</span>
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
