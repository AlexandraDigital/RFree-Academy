import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Lesson } from './types';
import { Header } from './components/Header';
import { LessonList } from './components/LessonList';
import { LessonForm } from './components/LessonForm';
import { githubService } from './utils/githubService';
import './styles.css';

/**
 * Admin mode: append ?admin=true to the URL to enable admin view.
 * e.g., https://yoursite.com/lesson-manager?admin=true
 * In admin mode, the raw GitHub source URL is visible on each lesson card.
 * Students and teachers use the regular URL and never see the GitHub link.
 */
const isAdmin = new URLSearchParams(window.location.search).get('admin') === 'true';

function LessonDirectory() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | undefined>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = async () => {
    setLoading(true);
    try {
      const data = await githubService.fetchLessons();
      setLessons(data);
    } catch (error) {
      console.error('Failed to load lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveLessons = async (updatedLessons: Lesson[]) => {
    setSaving(true);
    setSaveStatus('💾 Saving...');
    try {
      await githubService.saveLessons(updatedLessons);
      setLessons(updatedLessons);
      setSaveStatus('✅ Saved!');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (error) {
      setSaveStatus('❌ Save failed');
      console.error('Failed to save lessons:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveLesson = async (lesson: Lesson) => {
    let updatedLessons: Lesson[];
    if (editingLesson) {
      updatedLessons = lessons.map((l) => (l.id === lesson.id ? lesson : l));
    } else {
      updatedLessons = [...lessons, lesson];
    }
    await saveLessons(updatedLessons);
    setShowForm(false);
    setEditingLesson(undefined);
  };

  const handleDeleteLesson = async (id: string) => {
    if (confirm('Are you sure you want to delete this lesson?')) {
      const updatedLessons = lessons.filter((l) => l.id !== id);
      await saveLessons(updatedLessons);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify({ lessons }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lessons-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (file: File) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      const importedLessons = data.lessons || [];
      const merged = [...lessons, ...importedLessons];
      await saveLessons(merged);
    } catch (error) {
      alert('Failed to import lessons. Check file format.');
      console.error('Import error:', error);
    }
  };

  if (loading) {
    return <div className="loading">⏳ Loading lessons...</div>;
  }

  return (
    <div className="app-container">
      {isAdmin && (
        <div className="admin-mode-banner">
          🔒 Admin Mode — GitHub source URLs are visible
        </div>
      )}

      <Header
        onAddLesson={() => {
          setEditingLesson(undefined);
          setShowForm(true);
        }}
        onExport={handleExport}
        onImport={handleImport}
        lessonCount={lessons.length}
      />

      {saveStatus && <div className="save-status">{saveStatus}</div>}

      <main className="app-main">
        <LessonList
          lessons={lessons}
          onEdit={(lesson) => {
            setEditingLesson(lesson);
            setShowForm(true);
          }}
          onDelete={handleDeleteLesson}
          isAdmin={isAdmin}
        />
      </main>

      {showForm && (
        <LessonForm
          lesson={editingLesson}
          onSave={handleSaveLesson}
          onCancel={() => {
            setShowForm(false);
            setEditingLesson(undefined);
          }}
        />
      )}
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<LessonDirectory />);
