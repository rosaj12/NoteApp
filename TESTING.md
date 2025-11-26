# 🧪 Exemplos de Testes - NoteApp

## Introdução

Embora os testes não estejam implementados neste projeto, aqui estão exemplos de como você pode testar cada camada da Clean Architecture.

---

## Configuração de Testes

### Instalar dependências de teste

#### Backend
```bash
cd backend
npm install --save-dev jest @types/jest ts-jest
```

#### Frontend
```bash
cd frontend
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

### Configurar Jest (Backend)

**jest.config.js**
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
  ],
};
```

### Configurar Vitest (Frontend)

**vitest.config.ts**
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
```

---

## 1. Testes de Domínio

### Testar Entidades

```typescript
// backend/src/domain/entities/__tests__/Note.test.ts

import { Note, CreateNoteDTO } from '../Note';

describe('Note Entity', () => {
  it('should have all required properties', () => {
    const note: Note = {
      id: '123',
      title: 'Test Note',
      content: 'Test Content',
      category: 'Geral',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(note.id).toBe('123');
    expect(note.title).toBe('Test Note');
    expect(note.content).toBe('Test Content');
    expect(note.category).toBe('Geral');
  });

  it('should create DTO without id and dates', () => {
    const dto: CreateNoteDTO = {
      title: 'New Note',
      content: 'New Content',
      category: 'Trabalho',
    };

    expect(dto).not.toHaveProperty('id');
    expect(dto).not.toHaveProperty('createdAt');
    expect(dto).not.toHaveProperty('updatedAt');
  });
});
```

---

## 2. Testes de Use Cases

### Mock do Repositório

```typescript
// backend/src/usecases/__tests__/CreateNoteUseCase.test.ts

import { CreateNoteUseCase } from '../CreateNoteUseCase';
import { INoteRepository } from '../../domain/repositories/INoteRepository';
import { Note, CreateNoteDTO } from '../../domain/entities/Note';

// Mock Repository
class MockNoteRepository implements INoteRepository {
  private notes: Note[] = [];

  async create(noteData: CreateNoteDTO): Promise<Note> {
    const newNote: Note = {
      id: '123',
      ...noteData,
      createdAt: new Date('2025-11-26'),
      updatedAt: new Date('2025-11-26'),
    };
    this.notes.push(newNote);
    return newNote;
  }

  async findAll(): Promise<Note[]> {
    return this.notes;
  }

  async findById(id: string): Promise<Note | null> {
    return this.notes.find(n => n.id === id) || null;
  }

  async update(id: string, noteData: any): Promise<Note | null> {
    const index = this.notes.findIndex(n => n.id === id);
    if (index === -1) return null;
    this.notes[index] = { ...this.notes[index], ...noteData };
    return this.notes[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.notes.findIndex(n => n.id === id);
    if (index === -1) return false;
    this.notes.splice(index, 1);
    return true;
  }
}

describe('CreateNoteUseCase', () => {
  let useCase: CreateNoteUseCase;
  let repository: MockNoteRepository;

  beforeEach(() => {
    repository = new MockNoteRepository();
    useCase = new CreateNoteUseCase(repository);
  });

  it('should create a note successfully', async () => {
    const noteData: CreateNoteDTO = {
      title: 'Test Note',
      content: 'Test Content',
      category: 'Geral',
    };

    const result = await useCase.execute(noteData);

    expect(result).toHaveProperty('id');
    expect(result.title).toBe('Test Note');
    expect(result.content).toBe('Test Content');
    expect(result.category).toBe('Geral');
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');
  });

  it('should call repository.create with correct data', async () => {
    const createSpy = jest.spyOn(repository, 'create');
    
    const noteData: CreateNoteDTO = {
      title: 'Spy Test',
      content: 'Testing spy',
      category: 'Teste',
    };

    await useCase.execute(noteData);

    expect(createSpy).toHaveBeenCalledWith(noteData);
    expect(createSpy).toHaveBeenCalledTimes(1);
  });
});
```

### Testar todos os Use Cases

```typescript
// backend/src/usecases/__tests__/GetAllNotesUseCase.test.ts

import { GetAllNotesUseCase } from '../GetAllNotesUseCase';
import { MockNoteRepository } from './mocks/MockNoteRepository';

describe('GetAllNotesUseCase', () => {
  it('should return all notes', async () => {
    const repository = new MockNoteRepository();
    const useCase = new GetAllNotesUseCase(repository);

    // Adicionar notas de teste
    await repository.create({
      title: 'Note 1',
      content: 'Content 1',
      category: 'Geral'
    });
    await repository.create({
      title: 'Note 2',
      content: 'Content 2',
      category: 'Trabalho'
    });

    const notes = await useCase.execute();

    expect(notes).toHaveLength(2);
    expect(notes[0].title).toBe('Note 1');
    expect(notes[1].title).toBe('Note 2');
  });

  it('should return empty array when no notes exist', async () => {
    const repository = new MockNoteRepository();
    const useCase = new GetAllNotesUseCase(repository);

    const notes = await useCase.execute();

    expect(notes).toHaveLength(0);
    expect(notes).toEqual([]);
  });
});
```

---

## 3. Testes de Repositório

### Testar InMemoryRepository

```typescript
// backend/src/adapters/repositories/__tests__/InMemoryNoteRepository.test.ts

import { InMemoryNoteRepository } from '../InMemoryNoteRepository';
import { CreateNoteDTO } from '../../../domain/entities/Note';

describe('InMemoryNoteRepository', () => {
  let repository: InMemoryNoteRepository;

  beforeEach(() => {
    repository = new InMemoryNoteRepository();
  });

  describe('create', () => {
    it('should create a note with unique id', async () => {
      const noteData: CreateNoteDTO = {
        title: 'Test',
        content: 'Content',
        category: 'Geral',
      };

      const note = await repository.create(noteData);

      expect(note.id).toBeDefined();
      expect(note.title).toBe('Test');
      expect(note.createdAt).toBeInstanceOf(Date);
    });

    it('should add note to the list', async () => {
      await repository.create({
        title: 'Note 1',
        content: 'Content 1',
        category: 'Geral',
      });

      const notes = await repository.findAll();
      expect(notes).toHaveLength(1);
    });
  });

  describe('findAll', () => {
    it('should return all notes', async () => {
      await repository.create({
        title: 'Note 1',
        content: 'Content 1',
        category: 'Geral',
      });
      await repository.create({
        title: 'Note 2',
        content: 'Content 2',
        category: 'Trabalho',
      });

      const notes = await repository.findAll();
      expect(notes).toHaveLength(2);
    });
  });

  describe('findById', () => {
    it('should return note when found', async () => {
      const created = await repository.create({
        title: 'Find Me',
        content: 'Content',
        category: 'Geral',
      });

      const found = await repository.findById(created.id);
      expect(found).not.toBeNull();
      expect(found?.title).toBe('Find Me');
    });

    it('should return null when not found', async () => {
      const found = await repository.findById('non-existent-id');
      expect(found).toBeNull();
    });
  });

  describe('update', () => {
    it('should update existing note', async () => {
      const created = await repository.create({
        title: 'Original',
        content: 'Content',
        category: 'Geral',
      });

      const updated = await repository.update(created.id, {
        title: 'Updated',
      });

      expect(updated).not.toBeNull();
      expect(updated?.title).toBe('Updated');
      expect(updated?.content).toBe('Content'); // unchanged
    });

    it('should return null for non-existent note', async () => {
      const result = await repository.update('fake-id', {
        title: 'Updated',
      });

      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete existing note', async () => {
      const created = await repository.create({
        title: 'Delete Me',
        content: 'Content',
        category: 'Geral',
      });

      const deleted = await repository.delete(created.id);
      expect(deleted).toBe(true);

      const found = await repository.findById(created.id);
      expect(found).toBeNull();
    });

    it('should return false for non-existent note', async () => {
      const deleted = await repository.delete('fake-id');
      expect(deleted).toBe(false);
    });
  });
});
```

### Testar LocalStorageRepository (Frontend)

```typescript
// frontend/src/adapters/repositories/__tests__/LocalStorageNoteRepository.test.ts

import { LocalStorageNoteRepository } from '../LocalStorageNoteRepository';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('LocalStorageNoteRepository', () => {
  let repository: LocalStorageNoteRepository;

  beforeEach(() => {
    localStorage.clear();
    repository = new LocalStorageNoteRepository();
  });

  it('should save note to localStorage', async () => {
    const note = await repository.create({
      title: 'Test',
      content: 'Content',
      category: 'Geral',
    });

    const stored = localStorage.getItem('noteapp_notes');
    expect(stored).toBeDefined();
    
    const notes = JSON.parse(stored!);
    expect(notes).toHaveLength(1);
    expect(notes[0].title).toBe('Test');
  });

  it('should retrieve notes from localStorage', async () => {
    await repository.create({
      title: 'Note 1',
      content: 'Content',
      category: 'Geral',
    });

    const notes = await repository.findAll();
    expect(notes).toHaveLength(1);
    expect(notes[0].title).toBe('Note 1');
  });
});
```

---

## 4. Testes de Controller (Backend)

```typescript
// backend/src/adapters/controllers/__tests__/NoteController.test.ts

import { Request, Response } from 'express';
import { NoteController } from '../NoteController';
import { MockNoteRepository } from '../../__tests__/mocks/MockNoteRepository';
import { GetAllNotesUseCase } from '../../../usecases/GetAllNotesUseCase';
import { CreateNoteUseCase } from '../../../usecases/CreateNoteUseCase';
// ... outros use cases

describe('NoteController', () => {
  let controller: NoteController;
  let repository: MockNoteRepository;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    repository = new MockNoteRepository();
    
    const getAllUseCase = new GetAllNotesUseCase(repository);
    const createUseCase = new CreateNoteUseCase(repository);
    // ... outros use cases

    controller = new NoteController(
      getAllUseCase,
      getNoteByIdUseCase,
      createUseCase,
      updateUseCase,
      deleteUseCase
    );

    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  describe('getAll', () => {
    it('should return all notes', async () => {
      await repository.create({
        title: 'Test',
        content: 'Content',
        category: 'Geral',
      });

      await controller.getAll(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ title: 'Test' })
        ])
      );
    });

    it('should handle errors', async () => {
      jest.spyOn(repository, 'findAll').mockRejectedValue(new Error('DB Error'));

      await controller.getAll(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Erro ao buscar notas',
      });
    });
  });

  describe('create', () => {
    it('should create a note', async () => {
      mockRequest.body = {
        title: 'New Note',
        content: 'New Content',
        category: 'Geral',
      };

      await controller.create(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'New Note',
        })
      );
    });

    it('should validate required fields', async () => {
      mockRequest.body = { title: 'Only Title' }; // missing content

      await controller.create(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Título e conteúdo são obrigatórios',
      });
    });
  });
});
```

---

## 5. Testes de Componentes React (Frontend)

```typescript
// frontend/src/presentation/components/__tests__/NoteCard.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { NoteCard } from '../NoteCard';
import { Note } from '../../../domain/entities/Note';

describe('NoteCard', () => {
  const mockNote: Note = {
    id: '1',
    title: 'Test Note',
    content: 'Test Content',
    category: 'Geral',
    createdAt: new Date('2025-11-26'),
    updatedAt: new Date('2025-11-26'),
  };

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render note information', () => {
    render(
      <NoteCard
        note={mockNote}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText('Test Note')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Geral')).toBeInTheDocument();
  });

  it('should call onEdit when edit button is clicked', () => {
    render(
      <NoteCard
        note={mockNote}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const editButton = screen.getByTitle('Editar nota');
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockNote);
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  it('should confirm before deleting', () => {
    window.confirm = jest.fn(() => true);

    render(
      <NoteCard
        note={mockNote}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByTitle('Excluir nota');
    fireEvent.click(deleteButton);

    expect(window.confirm).toHaveBeenCalled();
    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  it('should not delete if user cancels', () => {
    window.confirm = jest.fn(() => false);

    render(
      <NoteCard
        note={mockNote}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByTitle('Excluir nota');
    fireEvent.click(deleteButton);

    expect(mockOnDelete).not.toHaveBeenCalled();
  });
});
```

---

## 6. Testes de Integração

```typescript
// backend/src/__tests__/integration/notes.integration.test.ts

import request from 'supertest';
import express from 'express';
// configurar app

describe('Notes API Integration', () => {
  let app: express.Application;

  beforeAll(() => {
    // Setup express app
  });

  it('should create and retrieve a note', async () => {
    // Create
    const createResponse = await request(app)
      .post('/api/notes')
      .send({
        title: 'Integration Test',
        content: 'Testing full flow',
        category: 'Teste',
      });

    expect(createResponse.status).toBe(201);
    const noteId = createResponse.body.id;

    // Retrieve
    const getResponse = await request(app)
      .get(`/api/notes/${noteId}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body.title).toBe('Integration Test');
  });

  it('should update a note', async () => {
    // Create
    const createResponse = await request(app)
      .post('/api/notes')
      .send({
        title: 'Original',
        content: 'Content',
        category: 'Geral',
      });

    const noteId = createResponse.body.id;

    // Update
    const updateResponse = await request(app)
      .put(`/api/notes/${noteId}`)
      .send({ title: 'Updated' });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.title).toBe('Updated');
  });
});
```

---

## 7. Scripts de Teste no package.json

### Backend
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### Frontend
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

---

## Executar Testes

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test

# Com coverage
npm run test:coverage
```

---

## Cobertura de Testes Ideal

```
Camada              Cobertura Mínima
─────────────────────────────────────
Domain              100%
Use Cases           100%
Repositories        90%
Controllers         80%
Components          70%
```

---

**🧪 Testes garantem qualidade e confiança no código!**
