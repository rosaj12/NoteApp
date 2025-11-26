# NoteApp - Aplicação de Notas com Clean Architecture

## 📋 Descrição
Aplicação web completa para gerenciamento de notas utilizando Clean Architecture, desenvolvida com React, TypeScript, Node.js e Express.

## 📚 Documentação

- **[⚡ Quick Start](QUICKSTART.md)** - Comece em 3 minutos!
- **[📖 Guia de Instalação](INSTALL.md)** - Como instalar e executar o projeto
- **[🏗️ Arquitetura](ARCHITECTURE.md)** - Explicação detalhada da Clean Architecture
- **[🎯 Princípios SOLID](SOLID.md)** - Como SOLID foi aplicado no projeto
- **[🧪 Testes](TESTING.md)** - Exemplos de testes para todas as camadas
- **[📡 API Documentation](API.md)** - Endpoints e exemplos da API REST
- **[🎨 Diagramas](DIAGRAMS.md)** - Diagramas visuais da arquitetura
- **[📸 Interface](UI_MOCKUPS.md)** - Mockups e demonstrações da UI
- **[🔧 Troubleshooting](TROUBLESHOOTING.md)** - Soluções para problemas comuns
- **[📊 Sumário do Projeto](PROJECT_SUMMARY.md)** - Visão geral completa

## 🚀 Tecnologias
- **Frontend**: React + TypeScript + CSS3
- **Backend**: Node.js + Express + TypeScript
- **Arquitetura**: Clean Architecture

## ✨ Funcionalidades
- ✅ CRUD completo de notas
- ✅ Salvamento automático com LocalStorage
- ✅ Busca e filtros
- ✅ Tema claro/escuro
- ✅ Interface responsiva

## 📁 Estrutura do Projeto
```
NoteApp/
├── backend/          # API Node.js + Express
│   ├── src/
│   │   ├── domain/   # Entidades e interfaces
│   │   ├── usecases/ # Casos de uso
│   │   ├── adapters/ # Controllers e repositórios
│   │   └── infrastructure/ # Express, rotas
│   └── package.json
└── frontend/         # React + TypeScript
    ├── src/
    │   ├── domain/   # Entidades e interfaces
    │   ├── usecases/ # Casos de uso
    │   ├── adapters/ # Repositórios
    │   ├── presentation/ # Componentes React
    │   └── infrastructure/ # Configurações
    └── package.json
```

## 🏃 Como Executar

### Opção 1: Scripts Automáticos (Windows)

```bash
# 1. Instalar dependências
install.bat

# 2. Iniciar aplicação
start.bat
```

### Opção 2: Manual

#### Backend
```bash
cd backend
npm install
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm start
```

**URLs:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🌐 Endpoints da API
- `GET /api/notes` - Listar todas as notas
- `POST /api/notes` - Criar nova nota
- `PUT /api/notes/:id` - Atualizar nota
- `DELETE /api/notes/:id` - Deletar nota

## 📝 Licença
MIT
