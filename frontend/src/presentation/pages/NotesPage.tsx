/**
 * NotesPage Component
 * 
 * Página principal de gerenciamento de notas com funcionalidades CRUD completas.
 * Interface central da aplicação onde usuários criam, editam, buscam e deletam notas.
 * 
 * Funcionalidades:
 * - Criar novas notas via formulário
 * - Editar notas existentes (modo inline no formulário)
 * - Deletar notas com confirmação
 * - Busca em tempo real com debounce (300ms)
 * - Filtrar por categoria
 * - Ordenar por: recentes, título ou categoria
 * - Contador de notas filtradas
 * - Loading states
 * 
 * Performance:
 * - useMemo para evitar recálculos desnecessários
 * - useDebounce para otimizar busca
 * - Filtragem e ordenação client-side eficientes
 * 
 * @component
 * @example
 * ```tsx
 * <Route path="/notes" element={<NotesPage />} />
 * ```
 */
import React, { useState, useMemo } from 'react';
import { SearchBar } from '../components/SearchBar';
import { NoteForm } from '../components/NoteForm';
import { NoteList } from '../components/NoteList';
import { useNotes } from '../hooks/useNotes';
import { Note } from '../../domain/entities/Note';
import { useDebounce } from '../hooks/useDebounce';
import './NotesPage.css';

export const NotesPage: React.FC = () => {
  // Hook CRUD de notas (Clean Architecture)
  const { notes, loading, createNote, updateNote, deleteNote } = useNotes();
  
  // Estado local para controle de edição
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  
  // Estados de filtros e busca
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [sortBy, setSortBy] = useState<'recent' | 'title' | 'category'>('recent');

  // Debounce na busca para evitar filtros a cada tecla (otimização)
  const debouncedSearch = useDebounce(searchQuery, 300);

  /**
   * Memo: Extrai categorias únicas das notas
   * Recalcula apenas quando array de notas muda
   */
  const categories = useMemo(() => {
    const cats = new Set(notes.map(note => note.category));
    return Array.from(cats).sort();
  }, [notes]);

  /**
   * Memo: Filtra e ordena notas baseado nos critérios selecionados
   * Otimizado para só recalcular quando dependências mudarem
   * 
   * Pipeline:
   * 1. Filtrar por busca (título ou conteúdo)
   * 2. Filtrar por categoria
   * 3. Ordenar conforme critério selecionado
   */
  const filteredNotes = useMemo(() => {
    // Etapa 1 e 2: Filtragem por busca e categoria
    let filtered = notes.filter(note => {
      const matchesSearch = 
        note.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        note.content.toLowerCase().includes(debouncedSearch.toLowerCase());
      
      const matchesCategory = 
        categoryFilter === 'Todas' || note.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });

    // Etapa 3: Ordenação
    switch (sortBy) {
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'category':
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'recent':
      default:
        // Ordenação padrão: mais recentes primeiro
        filtered.sort((a, b) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
    }

    return filtered;
  }, [notes, debouncedSearch, categoryFilter, sortBy]);

  /**
   * Handler unificado para criar ou atualizar nota
   * Detecta modo baseado na presença de editingNote
   */
  const handleCreateOrUpdate = async (noteData: any) => {
    if (editingNote) {
      // Modo edição: atualiza nota existente
      await updateNote(editingNote.id, noteData);
      setEditingNote(null); // Sai do modo edição
    } else {
      // Modo criação: cria nova nota
      await createNote(noteData);
    }
  };

  /**
   * Handler de edição: define nota para modo edição e scrolla para topo
   */
  const handleEdit = (note: Note) => {
    setEditingNote(note);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Handler de cancelamento: sai do modo edição
   */
  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  /**
   * Handler de deleção: deleta nota e sai do modo edição se for a mesma
   */
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
