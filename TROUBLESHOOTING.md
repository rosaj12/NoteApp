# 🔧 Troubleshooting - NoteApp

## Problemas Comuns e Soluções

### 1. Erro ao instalar dependências

#### Problema
```
npm ERR! code ENOENT
npm ERR! syscall open
```

#### Solução
```bash
# Certifique-se de estar na pasta correta
cd backend
# ou
cd frontend

# Tente limpar o cache do npm
npm cache clean --force

# Instale novamente
npm install
```

---

### 2. Porta já em uso

#### Problema
```
Error: listen EADDRINUSE: address already in use :::5000
```

#### Solução A - Mudar a porta (Backend)
```bash
# No Windows PowerShell
$env:PORT=5001; npm run dev

# No CMD
set PORT=5001 && npm run dev
```

#### Solução B - Matar o processo na porta
```bash
# Encontrar o processo
netstat -ano | findstr :5000

# Matar o processo (substitua PID pelo número encontrado)
taskkill /PID <PID> /F
```

---

### 3. Erro de CORS no Frontend

#### Problema
```
Access to fetch at 'http://localhost:5000/api/notes' from origin 
'http://localhost:3000' has been blocked by CORS policy
```

#### Solução
Verifique se o backend está rodando e se o CORS está configurado em `server.ts`:

```typescript
import cors from 'cors';
app.use(cors());
```

---

### 4. TypeScript não encontrado

#### Problema
```
'tsc' is not recognized as an internal or external command
```

#### Solução
```bash
# Instale TypeScript globalmente
npm install -g typescript

# Ou use via npx
npx tsc --version
```

---

### 5. Vite não inicia

#### Problema
```
Error: Cannot find module '@vitejs/plugin-react'
```

#### Solução
```bash
cd frontend
npm install @vitejs/plugin-react --save-dev
npm install
```

---

### 6. LocalStorage não funciona

#### Problema
As notas não são salvas após reload da página.

#### Solução
1. Verifique se está usando HTTP ou HTTPS (não file://)
2. Verifique se o navegador permite LocalStorage
3. Abra DevTools → Application → Local Storage
4. Limpe o LocalStorage e teste novamente:

```javascript
// No console do navegador
localStorage.clear();
location.reload();
```

---

### 7. Componentes não atualizam

#### Problema
Alterações no código não aparecem no navegador.

#### Solução
```bash
# Pare o servidor (Ctrl+C)
# Limpe o cache do Vite
rm -rf .vite
# ou no Windows
rmdir /s .vite

# Inicie novamente
npm start
```

---

### 8. Erro de compilação TypeScript

#### Problema
```
error TS2307: Cannot find module './domain/entities/Note'
```

#### Solução
Verifique os imports:
```typescript
// ✅ Correto
import { Note } from './domain/entities/Note';

// ❌ Errado
import { Note } from './domain/entities/Note.ts';
```

---

### 9. Temas não mudam

#### Problema
O botão de tema não alterna entre claro/escuro.

#### Solução
1. Verifique o console do navegador por erros
2. Limpe o LocalStorage:
```javascript
localStorage.removeItem('noteapp_theme');
```
3. Verifique se `data-theme` está sendo aplicado:
```javascript
document.documentElement.getAttribute('data-theme');
```

---

### 10. npm start não funciona

#### Problema
```
npm ERR! missing script: start
```

#### Solução Frontend
```bash
# Use o comando alternativo
npm run dev
```

#### Solução Backend
Adicione script em `package.json`:
```json
{
  "scripts": {
    "start": "node dist/infrastructure/server.js",
    "dev": "ts-node-dev --respawn --transpile-only src/infrastructure/server.ts"
  }
}
```

---

### 11. Notas não aparecem na lista

#### Problema
Lista de notas vazia mesmo após criar.

#### Solução
1. Abra DevTools → Console
2. Verifique erros JavaScript
3. Verifique o LocalStorage:
```javascript
JSON.parse(localStorage.getItem('noteapp_notes'));
```
4. Verifique o hook `useNotes`:
```typescript
console.log('Notes:', notes);
```

---

### 12. CSS não carrega

#### Problema
Estilos não são aplicados.

#### Solução
1. Verifique se os arquivos CSS foram importados:
```typescript
import './App.css';
import './components/Header.css';
```

2. Limpe o cache do navegador (Ctrl+Shift+Delete)

3. Verifique se o Vite está servindo os arquivos:
```bash
# Pare e inicie novamente
npm start
```

---

### 13. Erro 404 na API

#### Problema
```
GET http://localhost:5000/api/notes 404 (Not Found)
```

#### Solução
1. Verifique se o backend está rodando
2. Acesse `http://localhost:5000/health`
3. Verifique as rotas em `noteRoutes.ts`
4. Verifique o prefixo `/api` em `server.ts`:
```typescript
app.use('/api', createNoteRoutes(noteController));
```

---

### 14. Botões não respondem

#### Problema
Cliques em botões não funcionam.

#### Solução
1. Verifique o console por erros JavaScript
2. Verifique se os handlers estão conectados:
```tsx
<button onClick={handleClick}>Clique</button>
```
3. Verifique se não há eventos sendo bloqueados

---

### 15. Performance lenta

#### Problema
Aplicação lenta ou travando.

#### Solução
1. Verifique quantas notas existem:
```javascript
const notes = JSON.parse(localStorage.getItem('noteapp_notes'));
console.log('Total notes:', notes.length);
```

2. Limpe notas antigas se necessário
3. Otimize renderizações com `React.memo`
4. Use DevTools → Performance para análise

---

## Comandos Úteis para Debug

### Verificar versões
```bash
node --version
npm --version
```

### Limpar tudo e reinstalar
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Verificar processos em execução
```bash
# Windows
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# Ver processos Node.js
tasklist | findstr node
```

### Logs detalhados
```bash
# Backend com logs
cd backend
npm run dev --loglevel verbose

# Frontend com logs
cd frontend
npm start -- --debug
```

---

## Debug no Visual Studio Code

### launch.json para Backend
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Backend",
      "program": "${workspaceFolder}/backend/src/infrastructure/server.ts",
      "preLaunchTask": "tsc: build - backend/tsconfig.json",
      "outFiles": ["${workspaceFolder}/backend/dist/**/*.js"]
    }
  ]
}
```

### DevTools do Navegador
1. Pressione F12
2. Vá para Console
3. Vá para Network (para ver requisições)
4. Vá para Application → Local Storage

---

## Verificação de Saúde do Sistema

Execute este checklist:

- [ ] Node.js instalado (versão 16+)
- [ ] npm instalado
- [ ] Dependências do backend instaladas
- [ ] Dependências do frontend instaladas
- [ ] Backend rodando na porta 5000
- [ ] Frontend rodando na porta 3000
- [ ] Navegador suporta LocalStorage
- [ ] CORS habilitado no backend
- [ ] Console do navegador sem erros

---

## Suporte

Se o problema persistir:

1. **Verifique os logs** no console do terminal e do navegador
2. **Leia as mensagens de erro** completamente
3. **Procure no Stack Overflow** com a mensagem de erro
4. **Verifique a documentação** oficial:
   - [React](https://react.dev/)
   - [TypeScript](https://www.typescriptlang.org/)
   - [Vite](https://vitejs.dev/)
   - [Express](https://expressjs.com/)

---

## Reset Completo

Se nada funcionar, faça um reset completo:

```bash
# 1. Pare todos os servidores
# Pressione Ctrl+C em todos os terminais

# 2. Limpe o backend
cd backend
rm -rf node_modules package-lock.json dist
npm install

# 3. Limpe o frontend
cd ../frontend
rm -rf node_modules package-lock.json dist .vite
npm install

# 4. Limpe o navegador
# - Abra DevTools (F12)
# - Application → Local Storage → Clear All
# - Limpe o cache do navegador

# 5. Reinicie tudo
cd ../backend
npm run dev

# Em outro terminal
cd ../frontend
npm start
```

---

**💡 Dica**: Sempre leia as mensagens de erro por completo. Elas geralmente contêm a solução!
