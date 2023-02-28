import { Note } from "../../models";
import { NoteRepository } from "../../repositories";
import { UseCase } from "../utils/UseCase";

export type CreateNoteUseCaseParams = {
  content?: string;
  title?: string;
};

export abstract class CreateNoteUseCase extends UseCase<
  Note,
  CreateNoteUseCaseParams
> {
  constructor(private noteRepository: NoteRepository) {
    super();
  }

  async execute(params: CreateNoteUseCaseParams): Promise<Note> {
    const title = params.title || "My New note";
    const content = params.content || "Write your note here…";

    const note = await this.noteRepository.createNote({
      title,
      content,
    });
    return note;
  }
}
