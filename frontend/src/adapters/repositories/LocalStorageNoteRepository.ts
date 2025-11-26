import { Note, CreateNoteDTO, UpdateNoteDTO } from '../../domain/entities/Note';
import { INoteRepository } from '../../domain/repositories/INoteRepository';

const STORAGE_KEY = 'noteapp_notes';

export class LocalStorageNoteRepository implements INoteRepository {
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private getNotes(): Note[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    const notes = JSON.parse(data);
    // Convert date strings back to Date objects
    return notes.map((note: any) => ({
      ...note,
      createdAt: new Date(note.createdAt),
      updatedAt: new Date(note.updatedAt),
    }));
  }

  private saveNotes(notes: Note[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }

  async findAll(): Promise<Note[]> {
    return this.getNotes();
  }

  async findById(id: string): Promise<Note | null> {
    const notes = this.getNotes();
    const note = notes.find(n => n.id === id);
    return note || null;
  }

  async create(noteData: CreateNoteDTO): Promise<Note> {
    const notes = this.getNotes();
    const newNote: Note = {
      id: this.generateId(),
      ...noteData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    notes.push(newNote);
    this.saveNotes(notes);
    return newNote;
  }

  async update(id: string, noteData: UpdateNoteDTO): Promise<Note | null> {
    const notes = this.getNotes();
    const index = notes.findIndex(n => n.id === id);
    
    if (index === -1) return null;

    notes[index] = {
      ...notes[index],
      ...noteData,
      updatedAt: new Date(),
    };

    this.saveNotes(notes);
    return notes[index];
  }

  async delete(id: string): Promise<boolean> {
    const notes = this.getNotes();
    const index = notes.findIndex(n => n.id === id);
    
    if (index === -1) return false;

    notes.splice(index, 1);
    this.saveNotes(notes);
    return true;
  }
}
