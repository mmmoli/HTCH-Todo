import { Note, NoteStatus } from "../../domain/models";
import { CreateNoteParams, NoteRepository } from "../../domain/repositories";
import { LocalforageService } from "../services";
import { v4 as uuidv4 } from "uuid";

export class LocalStorageNoteRepository implements NoteRepository {
  constructor(private store: LocalforageService) {}
  createNote(args: CreateNoteParams): Promise<Note> {
    const id = uuidv4();
    const note: Note = {
      id,
      content: args.content,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: args.status || NoteStatus.DRAFT,
      title: args.title,
    };
    return this.store.set<Note>(id, note);
  }
}
