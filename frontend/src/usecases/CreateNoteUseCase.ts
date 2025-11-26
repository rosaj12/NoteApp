import { Note, CreateNoteDTO } from '../domain/entities/Note';
import { INoteRepository } from '../domain/repositories/INoteRepository';

export class CreateNoteUseCase {
  constructor(private noteRepository: INoteRepository) {}

  async execute(noteData: CreateNoteDTO): Promise<Note> {
    return await this.noteRepository.create(noteData);
  }
}
