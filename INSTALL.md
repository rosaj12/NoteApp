# 🚀 Guia de Instalação e Execução

## Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

## Instalação

### 1. Backend

```bash
# Navegue até a pasta do backend
cd backend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O servidor estará rodando em: `http://localhost:5000`

### 2. Frontend

Em um novo terminal:

```bash
# Navegue até a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

A aplicação estará disponível em: `http://localhost:3000`

## Estrutura do Projeto

### Backend (Clean Architecture)

```
backend/
├── src/
│   ├── domain/              # Camada de Domínio
│   │   ├── entities/        # Entidades de negócio
│   │   └── repositories/    # Interfaces dos repositórios
│   ├── usecases/            # Casos de Uso
│   ├── adapters/            # Adaptadores
│   │   ├── controllers/     # Controladores HTTP
│   │   └── repositories/    # Implementações dos repositórios
│   └── infrastructure/      # Infraestrutura
│       ├── routes/          # Rotas Express
│       └── server.ts        # Configuração do servidor
├── package.json
└── tsconfig.json
```

### Frontend (Clean Architecture)

```
frontend/
├── src/
│   ├── domain/              # Camada de Domínio
│   │   ├── entities/        # Entidades de negócio
│   │   └── repositories/    # Interfaces dos repositórios
│   ├── usecases/            # Casos de Uso
│   ├── adapters/            # Adaptadores
│   │   └── repositories/    # Implementação LocalStorage
│   └── presentation/        # Camada de Apresentação
│       ├── components/      # Componentes React
│       ├── hooks/           # Custom Hooks
│       └── App.tsx          # Componente principal
├── index.html
├── package.json
└── vite.config.ts
```

## Funcionalidades Implementadas

✅ **CRUD Completo**
- Criar notas
- Listar notas
- Editar notas
- Deletar notas

✅ **LocalStorage API**
- Salvamento automático no navegador
- Persistência de dados offline

✅ **Busca e Filtros**
- Busca por título e conteúdo
- Filtro por categoria

✅ **Tema Claro/Escuro**
- Alternância entre temas
- Preferência salva no LocalStorage

✅ **Interface Responsiva**
- Design adaptável para mobile e desktop
- Animações e transições suaves

## Tecnologias Utilizadas

### Backend
- Node.js
- Express
- TypeScript
- UUID

### Frontend
- React 18
- TypeScript
- Vite
- CSS3 (com variáveis CSS para temas)

### Arquitetura
- Clean Architecture
- Separation of Concerns
- Dependency Injection
- Repository Pattern

## Scripts Disponíveis

### Backend
- `npm run dev` - Inicia servidor em modo desenvolvimento
- `npm run build` - Compila TypeScript para JavaScript
- `npm start` - Inicia servidor em produção

### Frontend
- `npm start` ou `npm run dev` - Inicia desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza build de produção

## Categorias Disponíveis
- Geral
- Trabalho
- Pessoal
- Estudos
- Ideias

## API Endpoints (Backend)

- `GET /api/notes` - Lista todas as notas
- `GET /api/notes/:id` - Busca nota por ID
- `POST /api/notes` - Cria nova nota
- `PUT /api/notes/:id` - Atualiza nota
- `DELETE /api/notes/:id` - Deleta nota
- `GET /health` - Health check

## Observações

- O backend está configurado para rodar na porta 5000
- O frontend está configurado para rodar na porta 3000
- Os dados são salvos no LocalStorage do navegador
- Não é necessário banco de dados para executar a aplicação

## Melhorias Futuras Possíveis

- [ ] Integrar frontend com backend via API
- [ ] Adicionar autenticação de usuários
- [ ] Implementar banco de dados (PostgreSQL/MongoDB)
- [ ] Adicionar tags às notas
- [ ] Exportar notas em PDF/Markdown
- [ ] Sincronização em nuvem
- [ ] Rich Text Editor
- [ ] Anexos de arquivos

## Licença

MIT
