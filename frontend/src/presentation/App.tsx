import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { NoteForm } from './components/NoteForm';
import { NoteList } from './components/NoteList';
import { useNotes } from './hooks/useNotes';
import { Note } from '../domain/entities/Note';
import './App.css';

function App() {
  const { notes, loading, createNote, updateNote, deleteNote } = useNotes();
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(notes.map(note => note.category));
    return Array.from(cats).sort();
  }, [notes]);

  // Filter notes based on search and category
  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      const matchesSearch = 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        categoryFilter === 'Todas' || note.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }, [notes, searchQuery, categoryFilter]);

  const handleCreateOrUpdate = async (noteData: any) => {
    if (editingNote) {
      await updateNote(editingNote.id, noteData);
      setEditingNote(null);
    } else {
      await createNote(noteData);
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  const handleDelete = async (id: string) => {
    await deleteNote(id);
    if (editingNote?.id === id) {
      setEditingNote(null);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">⏳</div>
        <p>Carregando notas...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <NoteForm
            note={editingNote}
            onSubmit={handleCreateOrUpdate}
            onCancel={editingNote ? handleCancelEdit : undefined}
          />

          <SearchBar
            onSearch={setSearchQuery}
            onCategoryFilter={setCategoryFilter}
            categories={categories}
          />

          <div className="notes-count">
            {filteredNotes.length === notes.length ? (
              <p>Total de notas: <strong>{notes.length}</strong></p>
            ) : (
              <p>
                Mostrando <strong>{filteredNotes.length}</strong> de{' '}
                <strong>{notes.length}</strong> notas
              </p>
            )}
          </div>

          <NoteList
            notes={filteredNotes}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </main>

      <footer className="footer">
        <p>
          💡 Desenvolvido com Clean Architecture | React + TypeScript + LocalStorage
        </p>
      </footer>
    </div>
  );
}

export default App;
