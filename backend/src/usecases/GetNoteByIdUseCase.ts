import { Note } from '../domain/entities/Note';
import { INoteRepository } from '../domain/repositories/INoteRepository';

export class GetNoteByIdUseCase {
  constructor(private noteRepository: INoteRepository) {}

  async execute(id: string): Promise<Note | null> {
    return await this.noteRepository.findById(id);
  }
}
