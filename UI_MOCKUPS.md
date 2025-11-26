# 📸 Interface da Aplicação - NoteApp

## Tema Claro

```
╔══════════════════════════════════════════════════════════════════╗
║  📝 NoteApp                                            🌙         ║
╚══════════════════════════════════════════════════════════════════╝

┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Título da nota                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Categoria: [Geral ▼]                                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Escreva sua nota aqui...                                │  │
│  │                                                           │  │
│  │                                                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  [ ➕ Adicionar Nota ]                                          │
│                                                                 │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│  🔍 [ Buscar notas...            ]  Categoria: [Todas ▼]       │
│                                                                 │
└────────────────────────────────────────────────────────────────┘

Total de notas: 3

┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ Lista de Compras │  │ Reunião Cliente  │  │ Ideias Projeto   │
│ [Pessoal]        │  │ [Trabalho]       │  │ [Ideias]         │
│                  │  │                  │  │                  │
│ - Leite          │  │ Apresentar nova  │  │ • Adicionar modo │
│ - Pão            │  │ proposta para o  │  │   offline        │
│ - Frutas         │  │ projeto X        │  │ • Tema escuro    │
│                  │  │                  │  │ • Exportar PDF   │
│ 📅 26/11 10:00   │  │ 📅 26/11 14:30   │  │ 📅 25/11 18:00   │
│ ✏️ 🗑️             │  │ ✏️ 🗑️             │  │ ✏️ 🗑️             │
└──────────────────┘  └──────────────────┘  └──────────────────┘

╔══════════════════════════════════════════════════════════════════╗
║  💡 Desenvolvido com Clean Architecture                          ║
║     React + TypeScript + LocalStorage                            ║
╚══════════════════════════════════════════════════════════════════╝
```

## Tema Escuro

```
╔══════════════════════════════════════════════════════════════════╗
║  📝 NoteApp                                            ☀️         ║
╚══════════════════════════════════════════════════════════════════╝
█                                                                  █
█  ┌──────────────────────────────────────────────────────────┐  █
█  │  Título da nota                                          │  █
█  └──────────────────────────────────────────────────────────┘  █
█                                                                  █
█  ┌──────────────────────────────────────────────────────────┐  █
█  │  Categoria: [Estudos ▼]                                  │  █
█  └──────────────────────────────────────────────────────────┘  █
█                                                                  █
█  ┌──────────────────────────────────────────────────────────┐  █
█  │  Escreva sua nota aqui...                                │  █
█  │                                                           │  █
█  │                                                           │  █
█  └──────────────────────────────────────────────────────────┘  █
█                                                                  █
█  [ ➕ Adicionar Nota ]                                          █
█                                                                  █
█──────────────────────────────────────────────────────────────────█
█                                                                  █
█  🔍 [ Buscar notas...            ]  Categoria: [Todas ▼]       █
█                                                                  █
█──────────────────────────────────────────────────────────────────█

Mostrando 2 de 3 notas

┌──────────────────┐  ┌──────────────────┐
│ TypeScript Tips  │  │ React Hooks      │
│ [Estudos]        │  │ [Estudos]        │
│                  │  │                  │
│ • Usar tipos     │  │ useState para    │
│   específicos    │  │ estado local     │
│ • Evitar any     │  │                  │
│ • Interfaces >   │  │ useEffect para   │
│   Types          │  │ side effects     │
│                  │  │                  │
│ 📅 26/11 09:15   │  │ 📅 25/11 16:45   │
│ ✏️ 🗑️             │  │ ✏️ 🗑️             │
└──────────────────┘  └──────────────────┘

╔══════════════════════════════════════════════════════════════════╗
║  💡 Desenvolvido com Clean Architecture                          ║
║     React + TypeScript + LocalStorage                            ║
╚══════════════════════════════════════════════════════════════════╝
```

## Funcionalidades em Ação

### 1. Criar Nova Nota

```
┌─────────────────────────────────────────────┐
│  ┌──────────────────────────────────────┐  │
│  │  Aprender Clean Architecture ✓       │  │
│  └──────────────────────────────────────┘  │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │  Categoria: [Estudos ▼]              │  │
│  └──────────────────────────────────────┘  │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │  - Separação em camadas ✓            │  │
│  │  - Domain, Use Cases, Adapters ✓     │  │
│  │  - Dependency Injection ✓            │  │
│  └──────────────────────────────────────┘  │
│                                             │
│  [ ➕ Adicionar Nota ] ← Click!             │
│                                             │
└─────────────────────────────────────────────┘
           ↓
    Nota criada! ✅
    Salva no LocalStorage
```

### 2. Buscar Notas

```
┌─────────────────────────────────────────────┐
│  🔍 [ typescript ______ ]                   │
└─────────────────────────────────────────────┘
           ↓
    Filtrando...
           ↓
┌──────────────────┐  ┌──────────────────┐
│ TypeScript Tips  │  │ TypeScript Book  │
│ [Estudos]        │  │ [Estudos]        │
└──────────────────┘  └──────────────────┘

Mostrando 2 de 5 notas
```

### 3. Filtrar por Categoria

```
Categoria: [Trabalho ▼]
           ↓
┌──────────────────┐  ┌──────────────────┐
│ Reunião Cliente  │  │ Apresentação     │
│ [Trabalho]       │  │ [Trabalho]       │
└──────────────────┘  └──────────────────┘
```

### 4. Editar Nota

```
Click em ✏️
    ↓
┌─────────────────────────────────────────────┐
│  ┌──────────────────────────────────────┐  │
│  │  Reunião Cliente (editando...)       │  │
│  └──────────────────────────────────────┘  │
│                                             │
│  [ 💾 Salvar Alterações ] [ ❌ Cancelar ]   │
└─────────────────────────────────────────────┘
```

### 5. Deletar Nota

```
Click em 🗑️
    ↓
┌─────────────────────────────────────────────┐
│  ⚠️  Tem certeza que deseja excluir?        │
│                                             │
│  [ Confirmar ]  [ Cancelar ]                │
└─────────────────────────────────────────────┘
    ↓ (Confirmar)
    ✅ Nota excluída!
```

### 6. Alternar Tema

```
Click em 🌙
    ↓
┌─────────────────────────────────────────────┐
│  Theme: Light → Dark                        │
│  Background: #f5f7fa → #121212              │
│  Text: #212121 → #ffffff                    │
└─────────────────────────────────────────────┘
    ↓
    ✅ Tema alterado e salvo!
```

## Responsividade

### Desktop (> 768px)
```
┌───────────────────────────────────────────────────┐
│  [Nota 1]    [Nota 2]    [Nota 3]                │
│  [Nota 4]    [Nota 5]    [Nota 6]                │
└───────────────────────────────────────────────────┘
```

### Tablet (768px)
```
┌─────────────────────────────────┐
│  [Nota 1]    [Nota 2]           │
│  [Nota 3]    [Nota 4]           │
└─────────────────────────────────┘
```

### Mobile (< 768px)
```
┌───────────────┐
│  [Nota 1]     │
│  [Nota 2]     │
│  [Nota 3]     │
└───────────────┘
```

## Categorias com Cores

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ Geral       │  │ Trabalho    │  │ Pessoal     │
│ 🔵 Azul     │  │ 🟠 Laranja  │  │ 🟣 Roxo     │
└─────────────┘  └─────────────┘  └─────────────┘

┌─────────────┐  ┌─────────────┐
│ Estudos     │  │ Ideias      │
│ 🟢 Verde    │  │ 🟡 Amarelo  │
└─────────────┘  └─────────────┘
```

## Estados da Interface

### Loading (Carregando)
```
┌─────────────────────────────┐
│                             │
│          ⏳                 │
│   Carregando notas...       │
│                             │
└─────────────────────────────┘
```

### Empty State (Sem notas)
```
┌─────────────────────────────┐
│                             │
│          📝                 │
│  Nenhuma nota encontrada    │
│  Comece criando sua         │
│  primeira nota acima!       │
│                             │
└─────────────────────────────┘
```

### Error State (Erro)
```
┌─────────────────────────────┐
│          ⚠️                  │
│  Erro ao carregar notas     │
│  [Tentar novamente]         │
└─────────────────────────────┘
```

## Animações

### Hover em Card
```
Normal:
┌──────────────┐
│  Minha Nota  │
│  ...         │
└──────────────┘

Hover:
┌──────────────┐  ← Levanta 4px
│  Minha Nota  │  ← Borda azul
│  ...         │  ← Sombra maior
└──────────────┘
```

### Toggle Theme
```
🌙 → 🔄 → ☀️
(Rotação + Fade)
```

### Delete Animation
```
📌 → 📌💨 → 💨 → ∅
(Fade out + Slide)
```

## LocalStorage Viewer

```
Application → Local Storage → http://localhost:3000

┌─────────────────────────────────────────────┐
│ Key                  │ Value                │
├─────────────────────────────────────────────┤
│ noteapp_notes        │ [{id:"1",title:...}] │
│ noteapp_theme        │ "dark"               │
└─────────────────────────────────────────────┘
```

## API Testing (Postman/Insomnia)

```
POST http://localhost:5000/api/notes
Headers:
  Content-Type: application/json
Body:
{
  "title": "Teste via API",
  "content": "Criando nota pela API",
  "category": "Geral"
}

Response: 201 Created
{
  "id": "550e8400-...",
  "title": "Teste via API",
  "content": "Criando nota pela API",
  "category": "Geral",
  "createdAt": "2025-11-26T...",
  "updatedAt": "2025-11-26T..."
}
```

---

**🎨 Interface moderna, limpa e intuitiva seguindo princípios de UX/UI**
