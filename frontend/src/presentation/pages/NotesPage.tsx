import React, { useState, useMemo } from 'react';
import { SearchBar } from '../components/SearchBar';
import { NoteForm } from '../components/NoteForm';
import { NoteList } from '../components/NoteList';
import { useNotes } from '../hooks/useNotes';
import { Note } from '../../domain/entities/Note';
import { useDebounce } from '../hooks/useDebounce';
import './NotesPage.css';

export const NotesPage: React.FC = () => {
  const { notes, loading, createNote, updateNote, deleteNote } = useNotes();
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [sortBy, setSortBy] = useState<'recent' | 'title' | 'category'>('recent');

  // Debounce na busca para melhor performance
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(notes.map(note => note.category));
    return Array.from(cats).sort();
  }, [notes]);

  // Filter and sort notes
  const filteredNotes = useMemo(() => {
    let filtered = notes.filter(note => {
      const matchesSearch = 
        note.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        note.content.toLowerCase().includes(debouncedSearch.toLowerCase());
      
      const matchesCategory = 
        categoryFilter === 'Todas' || note.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });

    // Sort notes
    switch (sortBy) {
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'category':
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
    }

    return filtered;
  }, [notes, debouncedSearch, categoryFilter, sortBy]);

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
    <div className="notes-page">
      <div className="notes-page-header">
        <h1 className="page-title">📝 Minhas Notas</h1>
        <p className="page-subtitle">
          Gerencie todas as suas notas em um só lugar
        </p>
      </div>

      <NoteForm
        note={editingNote}
        onSubmit={handleCreateOrUpdate}
        onCancel={editingNote ? handleCancelEdit : undefined}
      />

      <div className="notes-controls">
        <SearchBar
          onSearch={setSearchQuery}
          onCategoryFilter={setCategoryFilter}
          categories={categories}
        />

        <div className="sort-controls">
          <label htmlFor="sort-by">Ordenar por:</label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="sort-select"
          >
            <option value="recent">Mais Recentes</option>
            <option value="title">Título (A-Z)</option>
            <option value="category">Categoria</option>
          </select>
        </div>
      </div>

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
  );
};
