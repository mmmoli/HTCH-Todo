import { Note, NoteStatus } from "../../domain/models";
import { CreateNoteParams, NoteRepository } from "../../domain/repositories";
import { v4 as uuidv4 } from "uuid";
import { of, Observable } from "rxjs";

const now = new Date();
export class NoteRepositoryInMemory implements NoteRepository {
  private notes: Note[] = [
    {
      content: "Content 1",
      createdAt: now,
      id: "1",
      status: NoteStatus.DRAFT,
      title: "Eat more chips",
      updatedAt: now,
    },
    {
      content: "Content 2",
      createdAt: now,
      id: "2",
      status: NoteStatus.RESOLVED,
      title: "Sleep more",
      updatedAt: now,
    },
  ];

  getAllNotes(): Observable<Note[]> {
    return of(this.notes);
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
    return of(note);
  }
}
