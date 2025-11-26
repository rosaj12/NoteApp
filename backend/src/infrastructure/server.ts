import express, { Application } from 'express';
import cors from 'cors';
import { createNoteRoutes } from './routes/noteRoutes';
import { InMemoryNoteRepository } from '../adapters/repositories/InMemoryNoteRepository';
import { NoteController } from '../adapters/controllers/NoteController';
import { GetAllNotesUseCase } from '../usecases/GetAllNotesUseCase';
import { GetNoteByIdUseCase } from '../usecases/GetNoteByIdUseCase';
import { CreateNoteUseCase } from '../usecases/CreateNoteUseCase';
import { UpdateNoteUseCase } from '../usecases/UpdateNoteUseCase';
import { DeleteNoteUseCase } from '../usecases/DeleteNoteUseCase';

const PORT = process.env.PORT || 5000;

// Dependency Injection
const noteRepository = new InMemoryNoteRepository();

const getAllNotesUseCase = new GetAllNotesUseCase(noteRepository);
const getNoteByIdUseCase = new GetNoteByIdUseCase(noteRepository);
const createNoteUseCase = new CreateNoteUseCase(noteRepository);
const updateNoteUseCase = new UpdateNoteUseCase(noteRepository);
const deleteNoteUseCase = new DeleteNoteUseCase(noteRepository);

const noteController = new NoteController(
  getAllNotesUseCase,
  getNoteByIdUseCase,
  createNoteUseCase,
  updateNoteUseCase,
  deleteNoteUseCase
);

// Express App
const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', createNoteRoutes(noteController));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'NoteApp Backend Running' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📝 API: http://localhost:${PORT}/api`);
});
