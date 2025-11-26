import { Router } from 'express';
import { NoteController } from '../adapters/controllers/NoteController';

export function createNoteRoutes(noteController: NoteController): Router {
  const router = Router();

  router.get('/notes', (req, res) => noteController.getAll(req, res));
  router.get('/notes/:id', (req, res) => noteController.getById(req, res));
  router.post('/notes', (req, res) => noteController.create(req, res));
  router.put('/notes/:id', (req, res) => noteController.update(req, res));
  router.delete('/notes/:id', (req, res) => noteController.delete(req, res));

  return router;
}
