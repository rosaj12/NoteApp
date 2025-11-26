import { Note, UpdateNoteDTO } from '../domain/entities/Note';
import { INoteRepository } from '../domain/repositories/INoteRepository';

export class UpdateNoteUseCase {
  constructor(private noteRepository: INoteRepository) {}

  async execute(id: string, noteData: UpdateNoteDTO): Promise<Note | null> {
    return await this.noteRepository.update(id, noteData);
  }
}
