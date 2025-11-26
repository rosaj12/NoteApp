# Clean Architecture - NoteApp

## 📐 O que é Clean Architecture?

Clean Architecture é um padrão de arquitetura de software proposto por Robert C. Martin (Uncle Bob) que visa separar as responsabilidades do código em camadas bem definidas, tornando o sistema:

- **Independente de frameworks**
- **Testável**
- **Independente de UI**
- **Independente de banco de dados**
- **Independente de qualquer agente externo**

## 🏗️ Camadas da Arquitetura

### 1. Domain (Domínio) - Centro da Aplicação

**Localização**: `src/domain/`

Esta é a camada mais interna e não depende de nenhuma outra camada.

#### Responsabilidades:
- Definir entidades de negócio
- Definir interfaces (portas) para repositórios
- Conter regras de negócio fundamentais

#### Arquivos:
```
domain/
├── entities/
│   └── Note.ts          # Entidade principal
└── repositories/
    └── INoteRepository.ts  # Interface do repositório
```

**Princípio**: Esta camada não conhece detalhes de implementação (banco de dados, UI, frameworks).

### 2. Use Cases (Casos de Uso)

**Localização**: `src/usecases/`

Contém a lógica de aplicação específica do negócio.

#### Responsabilidades:
- Orquestrar o fluxo de dados
- Implementar regras de negócio da aplicação
- Usar as interfaces do domínio

#### Arquivos:
```
usecases/
├── GetAllNotesUseCase.ts
├── CreateNoteUseCase.ts
├── UpdateNoteUseCase.ts
└── DeleteNoteUseCase.ts
```

**Princípio**: Cada caso de uso representa uma ação específica que o usuário pode realizar.

### 3. Adapters (Adaptadores)

**Localização**: `src/adapters/`

Converte dados entre casos de uso e o mundo externo.

#### Responsabilidades:
- Implementar interfaces do domínio
- Adaptar dados para casos de uso
- Controllers (no backend)

#### Arquivos Backend:
```
adapters/
├── controllers/
│   └── NoteController.ts      # Recebe requisições HTTP
└── repositories/
    └── InMemoryNoteRepository.ts  # Implementação em memória
```

#### Arquivos Frontend:
```
adapters/
└── repositories/
    └── LocalStorageNoteRepository.ts  # Implementação com LocalStorage
```

### 4. Infrastructure/Presentation (Infraestrutura/Apresentação)

**Localização**: `src/infrastructure/` (backend) ou `src/presentation/` (frontend)

Camada mais externa que lida com detalhes de implementação.

#### Backend - Infrastructure:
```
infrastructure/
├── routes/
│   └── noteRoutes.ts    # Rotas Express
└── server.ts            # Configuração do servidor
```

#### Frontend - Presentation:
```
presentation/
├── components/          # Componentes React
│   ├── Header.tsx
│   ├── NoteForm.tsx
│   ├── NoteCard.tsx
│   ├── NoteList.tsx
│   └── SearchBar.tsx
├── hooks/               # Custom Hooks
│   ├── useNotes.ts
│   └── useTheme.ts
└── App.tsx              # Aplicação principal
```

## 🔄 Fluxo de Dados

### Backend (API Request)
```
Request → Routes → Controller → Use Case → Repository → Database
Response ← Routes ← Controller ← Use Case ← Repository ← Database
```

### Frontend (User Action)
```
User → Component → Hook → Use Case → Repository → LocalStorage
UI ← Component ← Hook ← Use Case ← Repository ← LocalStorage
```

## 🎯 Dependency Rule (Regra de Dependência)

**Regra Fundamental**: As dependências só podem apontar para dentro (em direção ao domínio).

```
Infrastructure/Presentation
        ↓
    Adapters
        ↓
    Use Cases
        ↓
     Domain
```

- **Domain** não conhece nada sobre as outras camadas
- **Use Cases** conhecem apenas o Domain
- **Adapters** conhecem Domain e Use Cases
- **Infrastructure/Presentation** conhece todas as camadas

## 💉 Dependency Injection

### Backend (server.ts)
```typescript
// 1. Criar instância do repositório
const noteRepository = new InMemoryNoteRepository();

// 2. Injetar no caso de uso
const getAllNotesUseCase = new GetAllNotesUseCase(noteRepository);

// 3. Injetar no controller
const noteController = new NoteController(getAllNotesUseCase, ...);
```

### Frontend (useNotes.ts)
```typescript
// Instanciar repositório
const repository = new LocalStorageNoteRepository();

// Injetar nos casos de uso
const getAllNotesUseCase = new GetAllNotesUseCase(repository);
const createNoteUseCase = new CreateNoteUseCase(repository);
```

## 🔌 Repository Pattern

O padrão Repository abstrai a camada de persistência de dados.

### Interface (Domain)
```typescript
export interface INoteRepository {
  findAll(): Promise<Note[]>;
  findById(id: string): Promise<Note | null>;
  create(note: CreateNoteDTO): Promise<Note>;
  update(id: string, note: UpdateNoteDTO): Promise<Note | null>;
  delete(id: string): Promise<boolean>;
}
```

### Implementações (Adapters)

#### Backend - In Memory
```typescript
export class InMemoryNoteRepository implements INoteRepository {
  private notes: Note[] = [];
  // implementação...
}
```

#### Frontend - LocalStorage
```typescript
export class LocalStorageNoteRepository implements INoteRepository {
  private getNotes(): Note[] {
    // LocalStorage logic
  }
  // implementação...
}
```

**Vantagem**: Podemos trocar a implementação (LocalStorage → API, InMemory → PostgreSQL) sem alterar os casos de uso!

## ✅ Benefícios da Clean Architecture

### 1. Testabilidade
```typescript
// Fácil criar mock do repositório para testes
class MockNoteRepository implements INoteRepository {
  async findAll(): Promise<Note[]> {
    return [{ id: '1', title: 'Test', ... }];
  }
}
```

### 2. Independência de Framework
- Trocar Express por Fastify? Apenas altere a camada de Infrastructure
- Trocar React por Vue? Apenas altere a camada de Presentation

### 3. Manutenibilidade
- Código organizado em camadas claras
- Fácil localizar onde fazer mudanças
- Mudanças em uma camada não afetam outras

### 4. Reutilização
- Use Cases podem ser compartilhados entre diferentes interfaces (Web, Mobile, CLI)
- Domínio é completamente reutilizável

### 5. Flexibilidade
- Fácil adicionar novas funcionalidades
- Fácil trocar tecnologias

## 🔄 Exemplo de Fluxo Completo

### Criar uma Nova Nota (Frontend)

1. **User Interface** (Presentation)
```tsx
// NoteForm.tsx
const handleSubmit = (e) => {
  onSubmit({ title, content, category });
};
```

2. **Component/Hook** (Presentation)
```typescript
// useNotes.ts
const createNote = async (noteData: CreateNoteDTO) => {
  const newNote = await createNoteUseCase.execute(noteData);
  setNotes(prev => [...prev, newNote]);
  return newNote;
};
```

3. **Use Case**
```typescript
// CreateNoteUseCase.ts
async execute(noteData: CreateNoteDTO): Promise<Note> {
  return await this.noteRepository.create(noteData);
}
```

4. **Repository** (Adapter)
```typescript
// LocalStorageNoteRepository.ts
async create(noteData: CreateNoteDTO): Promise<Note> {
  const newNote = { id: generateId(), ...noteData, ... };
  notes.push(newNote);
  this.saveNotes(notes); // LocalStorage
  return newNote;
}
```

## 📚 Recursos Adicionais

- [The Clean Architecture - Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Clean Architecture Book](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164)

## 🎓 Conceitos Importantes

### SOLID Principles
- **S**ingle Responsibility Principle
- **O**pen/Closed Principle
- **L**iskov Substitution Principle
- **I**nterface Segregation Principle
- **D**ependency Inversion Principle

### Separation of Concerns
Cada camada tem uma responsabilidade específica e bem definida.

### Inversion of Control (IoC)
As camadas externas dependem de abstrações (interfaces) definidas nas camadas internas.

## 🚀 Próximos Passos

Para evoluir a arquitetura, você pode:

1. **Adicionar testes unitários** para casos de uso
2. **Implementar validação** na camada de domínio
3. **Adicionar eventos de domínio** para ações importantes
4. **Criar DTOs específicos** para entrada/saída de dados
5. **Implementar logging** e **error handling** centralizado

---

**Desenvolvido com 💙 seguindo os princípios da Clean Architecture**
