import React from 'react';
import { Note } from '../../domain/entities/Note';
import './NoteCard.css';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir esta nota?')) {
      onDelete(note.id);
    }
  };

  return (
    <div className="note-card">
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        <span className={`note-category category-${note.category.toLowerCase()}`}>
          {note.category}
        </span>
      </div>
      
      <p className="note-content">{note.content}</p>
      
      <div className="note-footer">
        <span className="note-date">
          📅 {formatDate(note.updatedAt)}
        </span>
        <div className="note-actions">
          <button 
            className="btn-icon btn-edit" 
            onClick={() => onEdit(note)}
            title="Editar nota"
          >
            ✏️
          </button>
          <button 
            className="btn-icon btn-delete" 
            onClick={handleDelete}
            title="Excluir nota"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};
