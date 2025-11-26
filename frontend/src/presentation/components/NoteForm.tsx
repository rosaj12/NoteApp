import React, { useState, useEffect } from 'react';
import { Note, CreateNoteDTO, UpdateNoteDTO } from '../../domain/entities/Note';
import './NoteForm.css';

interface NoteFormProps {
  note?: Note | null;
  onSubmit: (noteData: CreateNoteDTO | UpdateNoteDTO) => void;
  onCancel?: () => void;
}

export const NoteForm: React.FC<NoteFormProps> = ({ note, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Geral');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setCategory(note.category);
    }
  }, [note]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert('Título e conteúdo são obrigatórios!');
      return;
    }

    onSubmit({ title, content, category });
    
    // Reset form if creating new note
    if (!note) {
      setTitle('');
      setContent('');
      setCategory('Geral');
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="form-input"
          placeholder="Título da nota"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Geral">Geral</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Pessoal">Pessoal</option>
          <option value="Estudos">Estudos</option>
          <option value="Ideias">Ideias</option>
        </select>
      </div>

      <div className="form-group">
        <textarea
          className="form-textarea"
          placeholder="Escreva sua nota aqui..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {note ? '💾 Salvar Alterações' : '➕ Adicionar Nota'}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            ❌ Cancelar
          </button>
        )}
      </div>
    </form>
  );
};
