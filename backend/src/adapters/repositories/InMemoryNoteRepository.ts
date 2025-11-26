import { v4 as uuidv4 } from 'uuid';
import { Note, CreateNoteDTO, UpdateNoteDTO } from '../../domain/entities/Note';
import { INoteRepository } from '../../domain/repositories/INoteRepository';

export class InMemoryNoteRepository implements INoteRepository {
  private notes: Note[] = [];

  async findAll(): Promise<Note[]> {
    return [...this.notes];
  }

  async findById(id: string): Promise<Note | null> {
    const note = this.notes.find(note => note.id === id);
    return note || null;
  }

  async create(noteData: CreateNoteDTO): Promise<Note> {
    const newNote: Note = {
      id: uuidv4(),
      ...noteData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.notes.push(newNote);
    return newNote;
  }

  async update(id: string, noteData: UpdateNoteDTO): Promise<Note | null> {
    const index = this.notes.findIndex(note => note.id === id);
    if (index === -1) return null;

    this.notes[index] = {
      ...this.notes[index],
      ...noteData,
      updatedAt: new Date(),
    };

    return this.notes[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.notes.findIndex(note => note.id === id);
    if (index === -1) return false;

    this.notes.splice(index, 1);
    return true;
  }
}
