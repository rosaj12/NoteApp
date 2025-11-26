import { Note, CreateNoteDTO, UpdateNoteDTO } from '../entities/Note';

// Repository Interface (Port)
export interface INoteRepository {
  findAll(): Promise<Note[]>;
  findById(id: string): Promise<Note | null>;
  create(note: CreateNoteDTO): Promise<Note>;
  update(id: string, note: UpdateNoteDTO): Promise<Note | null>;
  delete(id: string): Promise<boolean>;
}
