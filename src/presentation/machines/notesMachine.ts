import { atomWithMachine } from "jotai-xstate";
import { createMachine, assign, spawn } from "xstate";
import type { Note } from "../../domain/models";
import { ListNotesUseCaseImpl } from "../../domain/usecases";
import { NoteRepositoryInMemory } from "../../infra/repositories/NoteRepositoryInMemory";
import { createNoteMachine } from "./noteMachine";

type Context = {
  notes: Note[];
  noteMachines: Record<string, ReturnType<typeof createNoteMachine>>;
};

type NoteEvent = { type: "EDIT" } | { type: "CANCEL" } | { type: "CHANGE" };

export const createNotesMachine = () =>
  createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5QDsD2AXOA6ANqghhAJbJQDEEqyYWJAbqgNY1qay4HGkL2oDG+dESoBtAAwBdcRMSgADqlhEhVWSAAeiAKwAWAJxYATAEYAHAHZzW42MOmxY8wBoQAT0SG9ANiw7DXrXN9L3MAgGY9AF9Il1ZsPEIScjAAJxTUFKw5HEEAMwyAWyw49gSuKB5kBgEVZGlpNQUlWrVNBF0DEwsrGzsHZzcPHVMsPX8tLXtDMW8HHWjYjGwiCBwwMgBRABEASQAVBqQQJuVhZFbELz0dUeMdMS8HsL87F3cEP2MsKz1TPSC9FpHGEtAsQCUsJBTqQyABhACCADlYRsADKHeSKU6qI5tYxeG7mcYhIKGaamLRvbR+LBA356bymAJBMEQqFCGGwgASSIA4hsMccsS1cYgaQ4JZLJcYqQgwl4fD8-mFjMZpkTzKylux2UkyOpYOhBDR8LlMCkABTTBwASjIbOIHKggpOItAeIJ32JlheYgpspsPmlXUM9z0aq1bCwsHwdD1lGotCqTBY2ujsaSlWqgjO9UkjWFZwu7X0RjMlmstnsjgDE185meWkM5lMOisYUMoJi4LTMbjMNS6Uy2TyhWKvYz3F4NVzkhdhZx7upnXLPSr-Vl4e+QLEqq8IK0ATEYWi3bQEDgahKBeaRdFCAAtFpRgzX2+32FZQ+vJH4pwkje2LnPedg3MMOhhKYxhjLuIIKrKhhhGIWAOPS9JQQ2XaLFGKxrIBboaIgpgmKMXTKv8Cp+AGfy0pKehiBBfq6L+OqOgBRyuneS7tF8+LmIykyQRMsovEYWj0gCQINj+Z5poOGT4VxhEIMRXxjGY5GhAShiylBtEShYx7mHxMnYdgfbsZit6LspdgGOBkHQdMxhwV4ulfDu-REiq1g6DJ0RAA */
      id: "notes",
      tsTypes: {} as import("./notesMachine.typegen").Typegen0,
      context: {
        notes: [] as Note[],
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
              actions: ["assign: all notes", "spawn note machines"],
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
    },
    {
      actions: {
        "assign: all notes": assign({
          notes: (_, event) => event.data as Note[],
        }),
        "assign: append notes": assign({
          notes: (context, event) => [...context.notes],
        }),
        "notify: is loading": () => {
          console.log("loading…");
        },
        "spawn note machines": () => {
          console.log("spawn note machines");
        },
        // "spawn note machines": assign({
        //   noteMachines: (context) =>
        //     context.notes.map((note) => spawn(createNoteMachine(note))),
        // }),
      },
      services: {
        "UseCase: Load Notes": async (context, event) => {
          const noteRepository = new NoteRepositoryInMemory();
          const listNotesUseCase = new ListNotesUseCaseImpl(noteRepository);
          return listNotesUseCase.execute();
        },
        "UseCase: Save Note": async (context, event) => {
          return Promise.resolve([]);
        },
      },
    }
  );

export const notesMachineAtom = atomWithMachine(createNotesMachine);
