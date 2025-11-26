// Domain Entity - Note
export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateNoteDTO = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateNoteDTO = Partial<CreateNoteDTO>;
