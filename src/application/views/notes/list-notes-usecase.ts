import { ListNotesUseCaseImpl } from "../../../domain/usecases";
import { NoteRepositoryInMemory } from "../../repositories/NoteRepositoryInMemory";
import { NoteRepositoryLocalStorage } from "../../repositories/NoteRepositoryLocalStorage";
import { LocalforageService } from "../../services";

// const localforageService = new LocalforageService();
// const noteRepository = new NoteRepositoryLocalStorage(localforageService);

const noteRepository = new NoteRepositoryInMemory();

export const getListNotesUseCase = () => {
  const listNotesUseCase = new ListNotesUseCaseImpl(noteRepository);
  return listNotesUseCase;
};
