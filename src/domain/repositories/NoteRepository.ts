import { Note } from "../models/Note";

export type GetNoteByIdParams = Pick<Note, "id">;

export type CreateNoteParams = Omit<
  Note,
  "id" | "createdAt" | "modifedAt" | "status"
>;

export abstract class NoteRepository {
  abstract getAllNotes(): Promise<Note[]>;
  abstract getNoteById(args: GetNoteByIdParams): Promise<Note>;
  abstract createNote(args: CreateNoteParams): Promise<Note>;
  abstract updateNote(): Promise<Note>;
  abstract deleteNote(): Promise<Note>;
}
