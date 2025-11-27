/**
 * NoteList Component
 * 
 * Componente responsável por renderizar uma lista de notas em formato de grid.
 * Exibe um estado vazio quando não há notas para mostrar.
 * 
 * @component
 * @param {NoteListProps} props - Propriedades do componente
 * @param {Note[]} props.notes - Array de notas a serem exibidas
 * @param {Function} props.onEdit - Callback para editar uma nota
 * @param {Function} props.onDelete - Callback para deletar uma nota
 * 
 * @example
 * ```tsx
 * <NoteList
 *   notes={notesArray}
 *   onEdit={handleEdit}
 *   onDelete={handleDelete}
 * />
 * ```
 */
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
  // Exibe estado vazio quando não há notas
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h2>Nenhuma nota encontrada</h2>
        <p>Comece criando sua primeira nota acima!</p>
      </div>
    );
  }

  // Renderiza grid de notas usando NoteCard para cada item
  return (
    <div className="note-list">
      {notes.map(note => (
        // Renderiza um cartão para cada nota, usando o ID como key única
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
