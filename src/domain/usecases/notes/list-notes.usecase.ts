import { Note } from "../../models";
import { NoteRepository } from "../../repositories";
import { UseCase } from "../utils/UseCase";
import { Observable } from "rxjs";

export type ListNotesUseCaseParams = {};

export abstract class ListNotesUseCase
  implements UseCase<Note[], ListNotesUseCaseParams>
{
  execute(_params: ListNotesUseCaseParams): Observable<Note[]> {
    throw new Error("Method not implemented.");
  }
}

export class ListNotesUseCaseImpl implements ListNotesUseCase {
  constructor(private noteRepository: NoteRepository) {}

  execute(): Observable<Note[]> {
    return this.noteRepository.getAllNotes();
  }
}
