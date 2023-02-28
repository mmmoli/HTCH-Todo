export type NoteId = string;
export type NoteContent = string;

export enum NoteStatus {
  DRAFT = "draft",
  RESOLVED = "resolved",
}

export interface Note {
  id: NoteId;
  title: NoteContent;
  content: NoteContent;
  status: NoteStatus;
  createdAt: Date;
  updatedAt: Date;
}
