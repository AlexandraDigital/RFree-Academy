import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Lesson } from './types';
import { Header } from './components/Header';
import { LessonList } from './components/LessonList';
import { LessonForm } from './components/LessonForm';
import { workerService } from './utils/workerService';
import './styles.css';

const isAdmin = new URLSearchParams(window.location.search).get('admin') === 'true';

function getCurrentUser() {
  return {
    email: localStorage.getItem('rfree_email') || '',
    role: localStorage.getItem('rfree_role') || 'student',
    name: localStorage.getItem('rfree_display_name') || '',
  };
}

function LessonDirectory() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | undefined>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [error, setError] = useState('');

  const user = getCurrentUser();
  const canCreate = ['admin', 'teacher'].includes(user.role);

  useEffect(() => { loadLessons(); }, []);

  const loadLessons = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await workerService.fetchLessons();
      setLessons(data);
    } catch (e: any) {
      setError('Could not load lessons. Check your Worker URL.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveLesson = async (data: Partial<Lesson>) => {
    setSaving(true);
    setSaveStatus('💾 Saving...');
    try {
      if (editingLesson) {
        const updated = await workerService.updateLesson(editingLesson.id, data);
        setLessons(prev => prev.map(l => l.id === updated.id ? updated : l));
      } else {
        const created = await workerService.createLesson(data);
        setLessons(prev => [created, ...prev]);
      }
      setSaveStatus('✅ Saved!');
      setShowForm(false);
      setEditingLesson(undefined);
    } catch (e: any) {
      setSaveStatus(`❌ ${e.message}`);
    } finally {
      setSaving(false);
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  // FIXED: Updates UI immediately by filtering the local state
  const handleDeleteLesson = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lesson?')) return;
    try {
      await workerService.deleteLesson(id);
      
      // Filter out the lesson with the matching 'id' column
      setLessons(prev => prev.filter(l => l.id !== id));
      
      console.log(`Lesson ${id} successfully deleted.`);
    } catch (e: any) {
      alert(`Delete failed: ${e.message}`);
    }
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify({ lessons }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `lessons-${Date.now()}.json`; a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (file: File) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      const imported: Lesson[] = data.lessons || [];
      for (const l of imported) {
        await workerService.createLesson(l);
      }
      await loadLessons();
    } catch {
      alert('Import failed. Check file format.');
    }
  };

  if (loading) return <div className="loading">⏳ Loading lessons...</div>;

  return (
    <div className="app-container">
      {isAdmin && <div className="admin-mode-banner">🔒 Admin Mode</div>}

      {error && (
        <div className="errors" style={{ margin: '1rem' }}>
          <p className="error-msg">⚠️ {error}</p>
        </div>
      )}

      <Header
        onAddLesson={canCreate ? () => { setEditingLesson(undefined); setShowForm(true); } : undefined}
        onExport={handleExport}
        onImport={handleImport}
        lessonCount={lessons.length}
      />

      {saveStatus && <div className="save-status">{saveStatus}</div>}

      <main className="app-main">
        <LessonList
          lessons={lessons}
          onEdit={(lesson) => { setEditingLesson(lesson); setShowForm(true); }}
          onDelete={handleDeleteLesson}
          isAdmin={isAdmin}
          userEmail={user.email}
          userRole={user.role}
        />
      </main>

      {showForm && (
        <LessonForm
          lesson={editingLesson}
          onSave={handleSaveLesson}
          onCancel={() => { setShowForm(false); setEditingLesson(undefined); }}
          saving={saving}
          userRole={user.role}
          userEmail={user.email}
        />
      )}
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<LessonDirectory />);
