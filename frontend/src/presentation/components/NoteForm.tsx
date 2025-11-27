/**
 * NoteForm Component
 * 
 * Formulário reutilizável para criação e edição de notas.
 * Suporta dois modos de operação:
 * - Criação: quando 'note' é null/undefined
 * - Edição: quando 'note' contém uma nota existente
 * 
 * @component
 * @param {NoteFormProps} props - Propriedades do componente
 * @param {Note | null} [props.note] - Nota a ser editada (opcional, null para criar nova)
 * @param {Function} props.onSubmit - Callback executado ao submeter o formulário
 * @param {Function} [props.onCancel] - Callback executado ao cancelar (opcional)
 * 
 * @example
 * // Modo criação
 * ```tsx
 * <NoteForm onSubmit={handleCreate} />
 * ```
 * 
 * @example
 * // Modo edição
 * ```tsx
 * <NoteForm
 *   note={existingNote}
 *   onSubmit={handleUpdate}
 *   onCancel={handleCancel}
 * />
 * ```
 */
import React, { useState, useEffect } from 'react';
import { Note, CreateNoteDTO, UpdateNoteDTO } from '../../domain/entities/Note';
import './NoteForm.css';

interface NoteFormProps {
  note?: Note | null;
  onSubmit: (noteData: CreateNoteDTO | UpdateNoteDTO) => void;
  onCancel?: () => void;
}

export const NoteForm: React.FC<NoteFormProps> = ({ note, onSubmit, onCancel }) => {
  // Estados locais para controlar os campos do formulário
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Geral');

  /**
   * Effect para preencher o formulário quando uma nota é passada para edição
   * Atualiza os campos sempre que a prop 'note' mudar
   */
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setCategory(note.category);
    }
  }, [note]);

  /**
   * Manipula o envio do formulário
   * Valida os campos obrigatórios e executa o callback onSubmit
   * Reseta o formulário após criação (não reseta em edição)
   * 
   * @param {React.FormEvent} e - Evento de submit do formulário
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação: verifica se título e conteúdo não estão vazios
    if (!title.trim() || !content.trim()) {
      alert('Título e conteúdo são obrigatórios!');
      return;
    }

    // Envia os dados da nota para o componente pai
    onSubmit({ title, content, category });
    
    // Reseta o formulário apenas se estiver criando uma nova nota
    if (!note) {
      setTitle('');
      setContent('');
      setCategory('Geral');
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      {/* Campo de título */}
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

      {/* Seletor de categoria */}
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

      {/* Campo de conteúdo (textarea) */}
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

      {/* Botões de ação */}
      <div className="form-actions">
        {/* Botão de submit com texto dinâmico baseado no modo (criar/editar) */}
        <button type="submit" className="btn btn-primary">
          {note ? '💾 Salvar Alterações' : '➕ Adicionar Nota'}
        </button>
        {/* Botão de cancelar (exibido apenas quando callback onCancel é fornecido) */}
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            ❌ Cancelar
          </button>
        )}
      </div>
    </form>
  );
};
