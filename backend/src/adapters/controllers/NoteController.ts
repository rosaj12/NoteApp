import { Request, Response } from 'express';
import { GetAllNotesUseCase } from '../../usecases/GetAllNotesUseCase';
import { GetNoteByIdUseCase } from '../../usecases/GetNoteByIdUseCase';
import { CreateNoteUseCase } from '../../usecases/CreateNoteUseCase';
import { UpdateNoteUseCase } from '../../usecases/UpdateNoteUseCase';
import { DeleteNoteUseCase } from '../../usecases/DeleteNoteUseCase';

export class NoteController {
  constructor(
    private getAllNotesUseCase: GetAllNotesUseCase,
    private getNoteByIdUseCase: GetNoteByIdUseCase,
    private createNoteUseCase: CreateNoteUseCase,
    private updateNoteUseCase: UpdateNoteUseCase,
    private deleteNoteUseCase: DeleteNoteUseCase
  ) {}

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const notes = await this.getAllNotesUseCase.execute();
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar notas' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const note = await this.getNoteByIdUseCase.execute(id);
      
      if (!note) {
        res.status(404).json({ error: 'Nota não encontrada' });
        return;
      }
      
      res.json(note);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar nota' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { title, content, category } = req.body;
      
      if (!title || !content) {
        res.status(400).json({ error: 'Título e conteúdo são obrigatórios' });
        return;
      }

      const note = await this.createNoteUseCase.execute({
        title,
        content,
        category: category || 'Geral',
      });
      
      res.status(201).json(note);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar nota' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, content, category } = req.body;

      const note = await this.updateNoteUseCase.execute(id, {
        title,
        content,
        category,
      });

      if (!note) {
        res.status(404).json({ error: 'Nota não encontrada' });
        return;
      }

      res.json(note);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar nota' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.deleteNoteUseCase.execute(id);

      if (!deleted) {
        res.status(404).json({ error: 'Nota não encontrada' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar nota' });
    }
  }
}
