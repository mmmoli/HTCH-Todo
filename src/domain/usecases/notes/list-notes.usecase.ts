import { Note } from "../../models";
import { NoteRepository } from "../../repositories";
import { UseCase } from "../utils/UseCase";

export type ListNotesUseCaseParams = {};

export abstract class ListNotesUseCase
  implements UseCase<Note[], ListNotesUseCaseParams>
{
  execute(_params: ListNotesUseCaseParams): Promise<Note[]> {
    throw new Error("Method not implemented.");
  }
}

export class ListNotesUseCaseImpl implements ListNotesUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute(): Promise<Note[]> {
    return this.noteRepository.getAllNotes();
  }
}
