import { Note, NoteStatus } from "../../domain/models";
import { CreateNoteParams, NoteRepository } from "../../domain/repositories";
import { LocalforageService } from "../services";
import { v4 as uuidv4 } from "uuid";
import { from, Observable } from "rxjs";

export class NoteRepositoryLocalStorage implements NoteRepository {
  constructor(private store: LocalforageService) {}

  getAllNotes(): Observable<Note[]> {
    return from(this.store.list<Note>());
  }

  createNote(args: CreateNoteParams): Observable<Note> {
    const id = uuidv4();
    const note: Note = {
      id,
      content: args.content,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: args.status || NoteStatus.DRAFT,
      title: args.title,
    };
    return from(this.store.set<Note>(id, note));
  }
}
