import { Note, NoteStatus } from "../../models";
import { NoteRepository } from "../../repositories";
import { UseCase } from "../utils/UseCase";

export type ResolveNoteUseCaseParams = {
  id: Note["id"];
};

export abstract class ResolveNoteUseCase extends UseCase<
  Note,
  ResolveNoteUseCaseParams
> {
  constructor(private noteRepository: NoteRepository) {
    super();
  }

  async execute({ id }: ResolveNoteUseCaseParams): Promise<Note> {
    const note = await this.noteRepository.getNoteById({ id });
    note.status = NoteStatus.RESOLVED;

    return note;
  }
}
