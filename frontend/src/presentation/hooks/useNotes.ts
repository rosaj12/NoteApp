import { useState, useEffect, useCallback } from 'react';
import { Note, CreateNoteDTO, UpdateNoteDTO } from '../../domain/entities/Note';
import { LocalStorageNoteRepository } from '../../adapters/repositories/LocalStorageNoteRepository';
import { GetAllNotesUseCase } from '../../usecases/GetAllNotesUseCase';
import { CreateNoteUseCase } from '../../usecases/CreateNoteUseCase';
import { UpdateNoteUseCase } from '../../usecases/UpdateNoteUseCase';
import { DeleteNoteUseCase } from '../../usecases/DeleteNoteUseCase';

const repository = new LocalStorageNoteRepository();
const getAllNotesUseCase = new GetAllNotesUseCase(repository);
const createNoteUseCase = new CreateNoteUseCase(repository);
const updateNoteUseCase = new UpdateNoteUseCase(repository);
const deleteNoteUseCase = new DeleteNoteUseCase(repository);

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNotes = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllNotesUseCase.execute();
      setNotes(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar notas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const createNote = async (noteData: CreateNoteDTO): Promise<Note> => {
    const newNote = await createNoteUseCase.execute(noteData);
    setNotes(prev => [...prev, newNote]);
    return newNote;
  };

  const updateNote = async (id: string, noteData: UpdateNoteDTO): Promise<Note | null> => {
    const updatedNote = await updateNoteUseCase.execute(id, noteData);
    if (updatedNote) {
      setNotes(prev => prev.map(note => note.id === id ? updatedNote : note));
    }
    return updatedNote;
  };

  const deleteNote = async (id: string): Promise<boolean> => {
    const deleted = await deleteNoteUseCase.execute(id);
    if (deleted) {
      setNotes(prev => prev.filter(note => note.id !== id));
    }
    return deleted;
  };

  return {
    notes,
    loading,
    error,
    createNote,
    updateNote,
    deleteNote,
    refreshNotes: loadNotes,
  };
}
