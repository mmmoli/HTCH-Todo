import { Note, NoteStatus } from "../../models";
import { NoteRepository } from "../../repositories";
import { UseCase } from "../utils/UseCase";
import { Observable } from "rxjs";

export type CreateNoteUseCaseParams = {
  content?: string;
  title?: string;
  status?: NoteStatus;
};

export abstract class CreateNoteUseCase
  implements UseCase<Note, CreateNoteUseCaseParams>
{
  execute(_params: CreateNoteUseCaseParams): Observable<Note> {
    throw new Error("Method not implemented.");
  }
}

export class CreateNoteUseCaseImpl implements CreateNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  execute({
    title = "My New note",
    content = "Write your note here…",
    status = NoteStatus.DRAFT,
  }: CreateNoteUseCaseParams): Observable<Note> {
    const note = this.noteRepository.createNote({
      title,
      status,
      content,
    });
    return note;
  }
}
