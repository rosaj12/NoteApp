/**
 * NoteCard Component
 * 
 * Componente de cartão que exibe uma nota individual com suas informações:
 * título, categoria, conteúdo, data de atualização e ações (editar/deletar).
 * 
 * @component
 * @param {NoteCardProps} props - Propriedades do componente
 * @param {Note} props.note - Objeto da nota a ser exibida
 * @param {Function} props.onEdit - Callback executado ao clicar em editar
 * @param {Function} props.onDelete - Callback executado ao confirmar exclusão
 * 
 * @example
 * ```tsx
 * <NoteCard
 *   note={noteObject}
 *   onEdit={(note) => handleEdit(note)}
 *   onDelete={(id) => handleDelete(id)}
 * />
 * ```
 */
import React from 'react';
import { Note } from '../../domain/entities/Note';
import './NoteCard.css';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  /**
   * Formata a data para o padrão brasileiro (dd/mm/aaaa hh:mm)
   * @param {Date} date - Data a ser formatada
   * @returns {string} Data formatada no padrão pt-BR
   */
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /**
   * Manipula a exclusão da nota com confirmação do usuário
   * Exibe um diálogo de confirmação antes de executar a exclusão
   */
  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir esta nota?')) {
      onDelete(note.id);
    }
  };

  return (
    <div className="note-card">
      {/* Cabeçalho do cartão com título e categoria */}
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        {/* Badge da categoria com classe dinâmica baseada no nome */}
        <span className={`note-category category-${note.category.toLowerCase()}`}>
          {note.category}
        </span>
      </div>
      
      {/* Conteúdo principal da nota */}
      <p className="note-content">{note.content}</p>
      
      {/* Rodapé com data de atualização e botões de ação */}
      <div className="note-footer">
        <span className="note-date">
          📅 {formatDate(note.updatedAt)}
        </span>
        <div className="note-actions">
          {/* Botão de edição */}
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
