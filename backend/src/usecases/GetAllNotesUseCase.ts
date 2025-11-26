import { Note } from '../domain/entities/Note';
import { INoteRepository } from '../domain/repositories/INoteRepository';

export class GetAllNotesUseCase {
  constructor(private noteRepository: INoteRepository) {}

  async execute(): Promise<Note[]> {
    return await this.noteRepository.findAll();
  }
}
