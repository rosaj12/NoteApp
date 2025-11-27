/**
 * useNotes Hook
 * 
 * Hook principal para gerenciamento de notas seguindo Clean Architecture.
 * Encapsula toda lógica de negócio relacionada a CRUD de notas.
 * 
 * Arquitetura:
 * - Utiliza Use Cases para lógica de negócio (camada de aplicação)
 * - Repository pattern para acesso a dados (camada de infraestrutura)
 * - Separation of Concerns: UI não conhece detalhes de persistência
 * 
 * Recursos:
 * - CRUD completo de notas
 * - Loading states
 * - Error handling
 * - Auto-load ao montar
 * - Refresh manual
 * - Type-safe com TypeScript
 * 
 * @returns {object} Objeto com notas, estados e operações CRUD
 * @returns {Note[]} notes - Array de notas
 * @returns {boolean} loading - Indica se está carregando
 * @returns {string | null} error - Mensagem de erro (se houver)
 * @returns {Function} createNote - Cria nova nota
 * @returns {Function} updateNote - Atualiza nota existente
 * @returns {Function} deleteNote - Deleta nota
 * @returns {Function} refreshNotes - Recarrega todas as notas
 * 
 * @example
 * ```tsx
 * const { notes, loading, error, createNote, updateNote, deleteNote } = useNotes();
 * 
 * if (loading) return <Spinner />;
 * if (error) return <Error message={error} />;
 * 
 * return (
 *   <div>
 *     {notes.map(note => <NoteCard key={note.id} note={note} />)}
 *     <button onClick={() => createNote({ title: 'Nova', content: 'Conteúdo' })}>
 *       Adicionar
 *     </button>
 *   </div>
 * );
 * ```
 */
import { useState, useEffect, useCallback } from 'react';
import { Note, CreateNoteDTO, UpdateNoteDTO } from '../../domain/entities/Note';
import { LocalStorageNoteRepository } from '../../adapters/repositories/LocalStorageNoteRepository';
import { GetAllNotesUseCase } from '../../usecases/GetAllNotesUseCase';
import { CreateNoteUseCase } from '../../usecases/CreateNoteUseCase';
import { UpdateNoteUseCase } from '../../usecases/UpdateNoteUseCase';
import { DeleteNoteUseCase } from '../../usecases/DeleteNoteUseCase';

// Instâncias globais (singleton pattern)
// Criadas uma vez e reutilizadas em todas as chamadas do hook
const repository = new LocalStorageNoteRepository();
const getAllNotesUseCase = new GetAllNotesUseCase(repository);
const createNoteUseCase = new CreateNoteUseCase(repository);
const updateNoteUseCase = new UpdateNoteUseCase(repository);
const deleteNoteUseCase = new DeleteNoteUseCase(repository);

export function useNotes() {
  // Estado que armazena array de todas as notas
  const [notes, setNotes] = useState<Note[]>([]);
  // Estado de loading para feedback visual durante operações
  const [loading, setLoading] = useState(true);
  // Estado de erro para exibir mensagens ao usuário
  const [error, setError] = useState<string | null>(null);

  /**
   * Carrega todas as notas do repositório
   * Wrapped com useCallback para estabilidade de referência
   * Usado no effect inicial e pode ser chamado manualmente para refresh
   */
  const loadNotes = useCallback(async () => {
    try {
      setLoading(true);
      // Delega para Use Case (camada de aplicação)
      const data = await getAllNotesUseCase.execute();
      setNotes(data);
      setError(null); // Limpa erros anteriores em caso de sucesso
    } catch (err) {
      setError('Erro ao carregar notas');
    } finally {
      // Sempre desativa loading, com ou sem erro
      setLoading(false);
    }
  }, []);

  /**
   * Effect que carrega notas ao montar o componente
   * Executa loadNotes uma vez no mount
   */
  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  /**
   * Cria uma nova nota
   * Atualiza estado local otimisticamente após criação bem-sucedida
   * 
   * @param {CreateNoteDTO} noteData - Dados da nova nota (title, content, category)
   * @returns {Promise<Note>} Nota criada com ID e timestamps
   */
  const createNote = async (noteData: CreateNoteDTO): Promise<Note> => {
    const newNote = await createNoteUseCase.execute(noteData);
    // Adiciona nova nota ao final do array
    setNotes(prev => [...prev, newNote]);
    return newNote;
  };

  /**
   * Atualiza uma nota existente
   * Atualiza estado local substituindo nota antiga pela atualizada
   * 
   * @param {string} id - ID da nota a atualizar
   * @param {UpdateNoteDTO} noteData - Novos dados (title, content, category)
   * @returns {Promise<Note | null>} Nota atualizada ou null se não encontrada
   */
  const updateNote = async (id: string, noteData: UpdateNoteDTO): Promise<Note | null> => {
    const updatedNote = await updateNoteUseCase.execute(id, noteData);
    if (updatedNote) {
      // Substitui nota antiga mantendo ordem do array
      setNotes(prev => prev.map(note => note.id === id ? updatedNote : note));
    }
    return updatedNote;
  };

  /**
   * Deleta uma nota
   * Remove do estado local se deletada com sucesso
   * 
   * @param {string} id - ID da nota a deletar
   * @returns {Promise<boolean>} true se deletada, false se não encontrada
   */
  const deleteNote = async (id: string): Promise<boolean> => {
    const deleted = await deleteNoteUseCase.execute(id);
    if (deleted) {
      // Remove nota do array usando filter
      setNotes(prev => prev.filter(note => note.id !== id));
    }
    return deleted;
  };

  /**
   * Retorna objeto com estado e operações
   * Consumidores podem desestruturar apenas o que precisam
   */
  return {
    notes,              // Array de notas
    loading,            // true durante carregamento inicial
    error,              // Mensagem de erro ou null
    createNote,         // Função para criar nota
    updateNote,         // Função para atualizar nota
    deleteNote,         // Função para deletar nota
    refreshNotes: loadNotes,  // Função para recarregar todas as notas
  };
}
