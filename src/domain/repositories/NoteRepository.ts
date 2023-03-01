import { Note } from "../models/Note";
import type { Observable } from "rxjs";

export type CreateNoteParams = Omit<Note, "id" | "createdAt" | "updatedAt">;
// export type GetNoteByIdParams = Pick<Note, "id">;

export abstract class NoteRepository {
  abstract getAllNotes(): Observable<Note[]>;
  abstract createNote(args: CreateNoteParams): Observable<Note>;
  // abstract getNoteById(args: GetNoteByIdParams): Promise<Note>;
  // abstract updateNote(): Promise<Note>;
  // abstract deleteNote(): Promise<Note>;
}
