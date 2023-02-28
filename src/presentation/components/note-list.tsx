import { FC } from "react";
import { NoteListItem } from "./note-list-item";

export const NoteList: FC = () => {
  return (
    <section>
      <h1>Notes</h1>
      <NoteListItem />
      <NoteListItem />
      <NoteListItem />
    </section>
  );
};
