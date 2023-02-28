import { createMachine, assign } from "xstate";
import type { Note } from "../../domain/models";

type Context = {
  title: string;
};

type NoteEvent = { type: "EDIT" } | { type: "CANCEL" } | { type: "CHANGE" };

export const createNoteMachine = (note: Note) =>
  createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5QDsD2AXOA6ANqghhAJbJQDEEqyYWJAbqgNY1qay4HGkL2oDG+dESoBtAAwBdcRMSgADqlhEhVWSAAeiAKwAWAJxYATAEYAHAHZzW42MOmxY8wBoQAT0SG9ANiw7DXrXN9L3MAgGY9AF9Il1ZsPEIScjAAJxTUFKw5HEEAMwyAWyw49gSuKB5kBgEVZGlpNQUlWrVNBF0DEwsrGzsHZzcPHVMsPX8tLXtDMW8HHWjYjGwiCBwwMgBRABEASQAVBqQQJuVhZFbELz0dUeMdMS8HsL87F3cEP2MsKz1TPSC9FpHGEtAsQCUsJBTqQyABhACCADlYRsADKHeSKU6qI5tYxeG7mcYhIKGaamLRvbR+LBA356bymAJBMEQqFCGGwgASSIA4hsMccsS1cYgaQ4JZLJcYqQgwl4fD8-mFjMZpkTzKylux2UkyOpYOhBDR8LlMCkABTTBwASjIbOIHKggpOItAeIJ32JlheYgpspsPmlXUM9z0aq1bCwsHwdD1lGotCqTBY2ujsaSlWqgjO9UkjWFZwu7X0RjMlmstnsjgDE185meWkM5lMOisYUMoJi4LTMbjMNS6Uy2TyhWKvYz3F4NVzkhdhZx7upnXLPSr-Vl4e+QLEqq8IK0ATEYWi3bQEDgahKBeaRdFCAAtFpRgzX2+32FZQ+vJH4pwkje2LnPedg3MMOhhKYxhjLuIIKrKhhhGIWAOPS9JQQ2XaLFGKxrIBboaIgpgmKMXTKv8Cp+AGfy0pKehiBBfq6L+OqOgBRyuneS7tF8+LmIykyQRMsovEYWj0gCQINj+Z5poOGT4VxhEIMRXxjGY5GhAShiylBtEShYx7mHxMnYdgfbsZit6LspdgGOBkHQdMxhwV4ulfDu-REiq1g6DJ0RAA */
      id: "note",
      tsTypes: {} as import("./noteMachine.typegen").Typegen0,
      context: {
        title: note.title,
      },
      schema: {
        context: {} as Context,
        events: {} as NoteEvent,
      },
      initial: "idle",
      predictableActionArguments: true,
      preserveActionOrder: true,
      states: {
        idle: {
          on: {
            EDIT: "editing",
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
              target: "idle",
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
      },
    },
    {
      actions: {},
      services: {},
    }
  );
