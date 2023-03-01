import { atomWithMachine } from "jotai-xstate";
import { createMachine, assign, spawn } from "xstate";
import { Note, NoteStatus } from "../../domain/models";
import { getListNotesUseCase } from "../../application/views";
import { createNoteMachine } from "./noteMachine";
import type { Observable } from "rxjs";
import { map, first } from "rxjs/operators";

type Context = {
  notes: Note[];
  noteMachines: unknown;
};

type NoteEvent =
  | { type: "EDIT" }
  | { type: "CANCEL" }
  | { type: "CHANGE" }
  | { type: "NOTES_RECEIVED"; data: Note[] };

export const createNotesMachine = () =>
  createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5QDsD2AXOA6ANqghhAJbJQDEEqyYWJAbqgNY1qay4HGkL2oDG+dESoBtAAwBdcRMSgADqlhEhVWSAAeiAGwAmLVi0AWMVoCMADkNaArKYDMpgDQgAnoh0B2Q1nNiAnH46ftbWhh6mHmJ2AL7RzqzYeIQk5GAATmmoaVhyOIIAZlkAtlgJ7ElcUDzIDAIqyNLSagpK9WqaCLr6RiYWVrYOzm4IOp5Ydv5+dp7WllpaXrHxGNhEEDhgZACiACIAkgAqTUggLcrCyO2IHh4643bWfqZBJh7mukOIhqZiWGE2fg8dnmTzE1iWIDKWEg51IZAAwgBBABy8K2ABljvJFOdVCcOjpDHdTIZLA8FjootYdNZPghrA4sKMATdCQzLBCoTChHD4QAJFEAcS2WNOOLa+MQPz8fx0FnmHj883mjzp-XGtkeWnMEys5g8nJW7G5KTI6lg6EENHw+UwaQAFJSxGIAJRkLnEHlQUVnCWgAlErAksnWClUml0+weLC3GzmALfMKhw1sLCwfB0U2Uai0GpMFhGtMZlLVWqCC6NSTNcUXK6dPQGYxmOYDJyuKVBLDO51BOX+czmcFxSGF9OZuHpTLZXIFYqlUfF7i8OoVyQ+mt4-3aBs9Zv9ext4bmUxYazd6aJoHHwwpuBkZEAeQOWwAygB9ABKWzRewAart11aWtJQQH5Qy7Bk7HCQxjBpLQ1TuR4wS0KDviVR5zFiYc0AgOA1DKasgM3DRtBPIl5QWJVlVVdsEAAWhgrA-H8QwHCg54xBmW9yk4FJCNxS4QOBE9mK6CYUIHaY6TlcwYz0WZLBYwwAi0bjaHWMB+L9EiEAHGU7FYrxngcY8-EMNUfiYjwWWBLRQSHZZUxNUgtOArdQIsU94x1d4SRghxaVo6lfkHUxHg8UJrFuGC1MnLJXOIjo9PGQzvh0EzTDMyN3gggJ2OUgzmTUsc+JOX03J02ymJMPRxLsSSdEjewmXkgc9EBTUDSwoA */
      id: "notes",
      tsTypes: {} as import("./notesMachine.typegen").Typegen0,
      context: {
        notes: [],
        noteMachines: {},
      },

      schema: {
        context: {} as Context,
        events: {} as NoteEvent,
      },

      initial: "loading",
      predictableActionArguments: true,
      preserveActionOrder: true,

      states: {
        loading: {
          entry: ["notify: is loading"],

          invoke: {
            src: "UseCase: Load Notes",
            onDone: {
              target: "idle",
            },
            onError: "error",
          },

          meta: {
            message: "Loading notes...",
          },

          tags: ["loading"],
        },

        idle: {
          on: {
            EDIT: "editing",
          },

          meta: {
            message: "Ready to edit",
          },
        },

        editing: {
          on: {
            CANCEL: "idle",

            CHANGE: {
              target: "editing",
              internal: true,
            },
          },

          after: {
            "2000": {
              target: "saving",
            },
          },
        },

        error: {
          entry: ["notify: has error"],
          tags: ["error"],
          type: "final",
          meta: {
            message: "Something went wrong :(",
          },
        },

        saving: {
          invoke: {
            src: "UseCase: Save Note",
            onDone: { target: "idle", actions: "assign: append notes" },
            onError: "error",
          },
          tags: ["loading"],
        },
      },

      on: {
        NOTES_RECEIVED: {
          target: "idle",
          actions: ["assign: incomming notes", "spawn: note machines"],
        },
      },
    },
    {
      actions: {
        "assign: incomming notes": assign({
          notes: (_, event) => [
            {
              content: "Content 1",
              createdAt: new Date(),
              id: "1",
              status: NoteStatus.DRAFT,
              title: "Eat more chips",
              updatedAt: new Date(),
            },
          ],
        }),
        "assign: append notes": assign({
          notes: (context, event) => [...context.notes],
        }),
        "notify: is loading": () => {
          console.log("loading…");
        },
        "spawn: note machines": assign({
          noteMachines: ({ notes }) =>
            notes.map((note) =>
              spawn(createNoteMachine(note), `note-${note.id}`)
            ),
        }),
      },
      services: {
        "UseCase: Load Notes": () => {
          const notes = getListNotesUseCase().execute().pipe(first());
          return notes;
        },
        "UseCase: Save Note": async (context, event) => {
          return Promise.resolve([]);
        },
      },
    }
  );

export const notesMachineAtom = atomWithMachine(createNotesMachine);
