import { Note, NoteStatus } from "../../domain/models";
import { CreateNoteParams, NoteRepository } from "../../domain/repositories";
import { v4 as uuidv4 } from "uuid";

const now = new Date();
export class NoteRepositoryInMemory implements NoteRepository {
  private notes: Note[] = [
    {
      content: "Content 1",
      createdAt: now,
      id: "1",
      status: NoteStatus.DRAFT,
      title: "Note 1",
      updatedAt: now,
    },
    {
      content: "Content 2",
      createdAt: now,
      id: "2",
      status: NoteStatus.RESOLVED,
      title: "Note 2",
      updatedAt: now,
    },
  ];

  getAllNotes(): Promise<Note[]> {
    return Promise.resolve(this.notes);
  }

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
    return Promise.resolve(note);
  }
}
