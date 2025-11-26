# ⚡ Quick Start - NoteApp

## 🚀 Início Rápido (3 minutos)

### Pré-requisitos
```bash
# Verifique se tem Node.js instalado
node --version
# Deve mostrar v16 ou superior
```

### Instalação Automática (Windows)

```bash
# 1. Clone ou extraia o projeto
cd C:\Users\mikan\Desktop\NoteApp

# 2. Execute o instalador
install.bat

# 3. Inicie a aplicação
start.bat

# Pronto! 🎉
```

A aplicação abrirá automaticamente em:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## 📖 Instalação Manual

### Backend (Terminal 1)
```bash
cd backend
npm install
npm run dev
```

### Frontend (Terminal 2)
```bash
cd frontend
npm install
npm start
```

---

## 🎯 Primeiros Passos

### 1. Criar sua primeira nota
1. Digite um título
2. Escolha uma categoria
3. Escreva o conteúdo
4. Clique em "Adicionar Nota"

### 2. Buscar notas
1. Digite na barra de busca
2. Ou filtre por categoria

### 3. Alternar tema
1. Clique no ícone 🌙/☀️ no topo

### 4. Editar nota
1. Clique no ícone ✏️ na nota
2. Faça alterações
3. Clique em "Salvar Alterações"

### 5. Deletar nota
1. Clique no ícone 🗑️
2. Confirme a exclusão

---

## 🧪 Testar a API

### Usando cURL
```bash
# Listar notas
curl http://localhost:5000/api/notes

# Criar nota
curl -X POST http://localhost:5000/api/notes ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"Teste\",\"content\":\"API funcionando\",\"category\":\"Geral\"}"
```

### Usando navegador
```
http://localhost:5000/health
```

---

## 📁 Estrutura Básica

```
NoteApp/
├── backend/          → API Node.js
│   └── src/
│       ├── domain/       → Entidades
│       ├── usecases/     → Lógica
│       ├── adapters/     → Controllers
│       └── infrastructure/ → Express
│
└── frontend/         → React App
    └── src/
        ├── domain/       → Entidades
        ├── usecases/     → Lógica
        ├── adapters/     → Repositórios
        └── presentation/ → Componentes
```

---

## 🔧 Comandos Úteis

### Parar servidores
```
Pressione Ctrl+C nos terminais
```

### Limpar cache
```bash
# Backend
cd backend
rm -rf node_modules
npm install

# Frontend
cd frontend
rm -rf node_modules
npm install
```

### Ver logs
```bash
# Os logs aparecem nos terminais onde executou
npm run dev
```

---

## 💡 Dicas Rápidas

### LocalStorage
- Dados salvos automaticamente
- Persistem após fechar navegador
- Limpar: F12 → Application → Clear Storage

### Temas
- Preferência salva automaticamente
- Alt+Shift+T (não implementado, mas pode adicionar)

### Busca
- Case-insensitive
- Busca em título e conteúdo
- Atualiza em tempo real

### Categorias
- 5 categorias pré-definidas
- Cores automáticas
- Filtro rápido

---

## 📚 Próximos Passos

1. **Ler a documentação**
   - [ARCHITECTURE.md](ARCHITECTURE.md) - Entender a arquitetura
   - [SOLID.md](SOLID.md) - Princípios aplicados
   - [API.md](API.md) - Documentação da API

2. **Explorar o código**
   - Comece pelo `domain/entities/Note.ts`
   - Veja os Use Cases
   - Entenda os Repositories

3. **Personalizar**
   - Adicione novas categorias
   - Mude cores no CSS
   - Adicione validações

4. **Expandir**
   - Adicione autenticação
   - Conecte com banco de dados
   - Implemente testes

---

## ❓ Problemas Comuns

### Porta já em uso
```bash
# Mude a porta do backend
set PORT=5001 && npm run dev

# Ou mate o processo
taskkill /F /IM node.exe
```

### Notas não aparecem
```javascript
// Limpe o LocalStorage
localStorage.clear()
location.reload()
```

### Erro ao instalar
```bash
# Limpe cache do npm
npm cache clean --force
npm install
```

---

## 📞 Ajuda

- **Troubleshooting**: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Documentação**: [README.md](README.md)
- **Sumário**: [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

---

## 🎓 Aprenda Mais

### Clean Architecture
1. Leia [ARCHITECTURE.md](ARCHITECTURE.md)
2. Estude os diagramas em [DIAGRAMS.md](DIAGRAMS.md)
3. Veja exemplos práticos no código

### SOLID
1. Leia [SOLID.md](SOLID.md)
2. Identifique princípios no código
3. Pratique aplicando em novos recursos

### TypeScript
1. Veja as interfaces em `domain/`
2. Estude os tipos em `entities/`
3. Pratique criando novos tipos

---

## ✨ Recursos

### Frontend
- React 18 com Hooks
- TypeScript para tipagem
- CSS3 com variáveis
- Vite para build rápido

### Backend
- Express framework
- TypeScript
- CORS habilitado
- In-memory storage

---

## 🎉 Comece Agora!

```bash
# Execute este comando e comece:
start.bat
```

**Boa sorte com seu aprendizado! 🚀**

---

**Tempo estimado**: 3 minutos para instalar, 30 minutos para dominar
