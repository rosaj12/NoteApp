# 📡 API Documentation - NoteApp Backend

## Base URL
```
http://localhost:5000/api
```

## Endpoints

### 1. Get All Notes

**GET** `/notes`

Retorna todas as notas cadastradas.

#### Request
```bash
curl http://localhost:5000/api/notes
```

#### Response (200 OK)
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Minha primeira nota",
    "content": "Conteúdo da nota",
    "category": "Geral",
    "createdAt": "2025-11-26T10:00:00.000Z",
    "updatedAt": "2025-11-26T10:00:00.000Z"
  }
]
```

---

### 2. Get Note by ID

**GET** `/notes/:id`

Retorna uma nota específica por ID.

#### Request
```bash
curl http://localhost:5000/api/notes/550e8400-e29b-41d4-a716-446655440000
```

#### Response (200 OK)
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Minha primeira nota",
  "content": "Conteúdo da nota",
  "category": "Geral",
  "createdAt": "2025-11-26T10:00:00.000Z",
  "updatedAt": "2025-11-26T10:00:00.000Z"
}
```

#### Response (404 Not Found)
```json
{
  "error": "Nota não encontrada"
}
```

---

### 3. Create Note

**POST** `/notes`

Cria uma nova nota.

#### Request
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Minha nova nota",
    "content": "Este é o conteúdo da minha nota",
    "category": "Trabalho"
  }'
```

#### Request Body
```json
{
  "title": "Minha nova nota",
  "content": "Este é o conteúdo da minha nota",
  "category": "Trabalho"
}
```

**Campos obrigatórios:**
- `title` (string)
- `content` (string)

**Campos opcionais:**
- `category` (string, default: "Geral")

#### Response (201 Created)
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "title": "Minha nova nota",
  "content": "Este é o conteúdo da minha nota",
  "category": "Trabalho",
  "createdAt": "2025-11-26T10:30:00.000Z",
  "updatedAt": "2025-11-26T10:30:00.000Z"
}
```

#### Response (400 Bad Request)
```json
{
  "error": "Título e conteúdo são obrigatórios"
}
```

---

### 4. Update Note

**PUT** `/notes/:id`

Atualiza uma nota existente.

#### Request
```bash
curl -X PUT http://localhost:5000/api/notes/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Título atualizado",
    "content": "Conteúdo atualizado",
    "category": "Pessoal"
  }'
```

#### Request Body (todos os campos são opcionais)
```json
{
  "title": "Título atualizado",
  "content": "Conteúdo atualizado",
  "category": "Pessoal"
}
```

#### Response (200 OK)
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Título atualizado",
  "content": "Conteúdo atualizado",
  "category": "Pessoal",
  "createdAt": "2025-11-26T10:00:00.000Z",
  "updatedAt": "2025-11-26T11:00:00.000Z"
}
```

#### Response (404 Not Found)
```json
{
  "error": "Nota não encontrada"
}
```

---

### 5. Delete Note

**DELETE** `/notes/:id`

Deleta uma nota.

#### Request
```bash
curl -X DELETE http://localhost:5000/api/notes/550e8400-e29b-41d4-a716-446655440000
```

#### Response (204 No Content)
```
(sem corpo de resposta)
```

#### Response (404 Not Found)
```json
{
  "error": "Nota não encontrada"
}
```

---

### 6. Health Check

**GET** `/health`

Verifica se o servidor está funcionando.

#### Request
```bash
curl http://localhost:5000/health
```

#### Response (200 OK)
```json
{
  "status": "OK",
  "message": "NoteApp Backend Running"
}
```

---

## Categorias Disponíveis

- Geral
- Trabalho
- Pessoal
- Estudos
- Ideias

## Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado com sucesso |
| 204 | No Content - Recurso deletado com sucesso |
| 400 | Bad Request - Dados inválidos |
| 404 | Not Found - Recurso não encontrado |
| 500 | Internal Server Error - Erro no servidor |

## Exemplos com JavaScript/TypeScript

### Fetch API

```typescript
// Get all notes
const getNotes = async () => {
  const response = await fetch('http://localhost:5000/api/notes');
  const notes = await response.json();
  return notes;
};

// Create note
const createNote = async (noteData) => {
  const response = await fetch('http://localhost:5000/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(noteData),
  });
  const newNote = await response.json();
  return newNote;
};

// Update note
const updateNote = async (id, noteData) => {
  const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(noteData),
  });
  const updatedNote = await response.json();
  return updatedNote;
};

// Delete note
const deleteNote = async (id) => {
  await fetch(`http://localhost:5000/api/notes/${id}`, {
    method: 'DELETE',
  });
};
```

## CORS

O backend está configurado para aceitar requisições de qualquer origem (CORS habilitado).

```typescript
app.use(cors());
```

## Notas Importantes

1. **Dados em Memória**: Os dados são armazenados em memória. Reiniciar o servidor apaga todos os dados.
2. **Sem Autenticação**: Não há autenticação implementada.
3. **Validação Básica**: Apenas validações básicas são realizadas.

## Como Testar

### Usando cURL
```bash
# Criar nota
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Teste","content":"Testando API","category":"Geral"}'

# Listar notas
curl http://localhost:5000/api/notes
```

### Usando Postman/Insomnia
1. Importe a coleção de endpoints
2. Configure a base URL: `http://localhost:5000/api`
3. Teste cada endpoint

### Usando Navegador
```javascript
// Abra o console do navegador (F12)
fetch('http://localhost:5000/api/notes')
  .then(res => res.json())
  .then(data => console.log(data));
```

---

**🚀 Desenvolvido com Node.js + Express + TypeScript**
