import React from 'react';
import { Note } from '../../domain/entities/Note';
import { NoteCard } from './NoteCard';
import './NoteList.css';

interface NoteListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export const NoteList: React.FC<NoteListProps> = ({ notes, onEdit, onDelete }) => {
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h2>Nenhuma nota encontrada</h2>
        <p>Comece criando sua primeira nota acima!</p>
      </div>
    );
  }

  return (
    <div className="note-list">
      {notes.map(note => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
