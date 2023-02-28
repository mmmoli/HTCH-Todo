import { Note, NoteStatus } from "../../models";
import { NoteRepository } from "../../repositories";
import { UseCase } from "../utils/UseCase";

export type CreateNoteUseCaseParams = {
  content?: string;
  title?: string;
  status?: NoteStatus;
};

export abstract class CreateNoteUseCase
  implements UseCase<Note, CreateNoteUseCaseParams>
{
  execute(_params: CreateNoteUseCaseParams): Promise<Note> {
    throw new Error("Method not implemented.");
  }
}

export class CreateNoteUseCaseImpl implements CreateNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({
    title = "My New note",
    content = "Write your note here…",
    status = NoteStatus.DRAFT,
  }: CreateNoteUseCaseParams): Promise<Note> {
    const note = await this.noteRepository.createNote({
      title,
      status,
      content,
    });
    return note;
  }
}
