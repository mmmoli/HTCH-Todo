import { FC } from "react";
import { NoteListItem } from "./note-list-item";
import { useAtom } from "jotai";
import { notesMachineAtom } from "../machines/notesMachine";

export const NoteList: FC = () => {
  const [state, send] = useAtom(notesMachineAtom);

  return (
    <section>
      <h1>Notes</h1>

      {state.matches("loading") && (
        <>
          <div>{state.meta.message}</div>
        </>
      )}

      {(state.matches("idle") || state.matches("editing")) && (
        <>
          {state.context.notes.map((note) => (
            <NoteListItem
              key={note.id ?? "note-id"}
              title={note.title}
              id={note.id}
            />
          ))}
        </>
      )}

      {state.nextEvents.includes("EDIT") && (
        <button onClick={() => send("EDIT")}>Edit</button>
      )}
    </section>
  );
};
