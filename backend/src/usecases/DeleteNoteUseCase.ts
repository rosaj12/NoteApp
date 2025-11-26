import { INoteRepository } from '../domain/repositories/INoteRepository';

export class DeleteNoteUseCase {
  constructor(private noteRepository: INoteRepository) {}

  async execute(id: string): Promise<boolean> {
    return await this.noteRepository.delete(id);
  }
}
