import { createMachine } from "xstate";

export const notesMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDsD2AXOA6ANqghhAJbJQDEEqyYWJAbqgNY1qay4HGkL2oDG+dESoBtAAwBdcRMSgADqlhEhVWSAAeiAKwAWAJxYATAEYAHAHYAzHr3GdpvZZ0AaEAE9EhrcaynL-73MANiDTC3NzAF9I11ZsPEIScjAAJxTUFKw5HEEAMwyAWyw49gSuKB5kBgEVZGlpNQUlWrVNBF0DEwtrW3tHF3dPMR0sf38dLUdvGx0omJAS2ggcMDIAUQARAEkAFQakECblYWRWxCC9Ed6xQysbPW8tVw8ESwssfRsw81M7Uy8gtFYhhsJBjqQyABhACCADlIWsADL7eSKY6qA5tYxBEbmQxBLRBQyWG6GQx+SzPbRiUxGLRiMSWYz4syhUyA+aLMFCCGQgAScIA4msUYc0S1MYgdIYsAy5fL5cYqa9LDLPjZQlYidKdECFiD2NykmR1LB0IIaPhcpgUgAKQxygCUZC5xB5UFFRwloCxOKweIJRJJZPJ-mVxjs-vpNxp3WMWr1i1g+Doxso1FoVSYLANWGTqe4vBqJ3qkka4pOZ3a+iMZjuvQcTnDhgMiqcQWMNPJHOBbDzKeNqXSmWyeUKxVz+aSlWqghLkk9FYxPu0Na69b+-WVvyw0YZwRb1gmlminNQEDgahK5ealclCAAtFosPdX2+bJTBo+e-q+2Ukje6KnPe5IjPYOiWDi0rBEENwDC8xgPFGDJ-PGVh-ImuZEMsYCAd6GiIP8Ph6F0vxhDo9imMq+hBP6crYjoXZaFo7KYX2RqkHhd4ru0PjYuYegEviWhksMEzKm8tIKg65izISbGgmkGRccuBEIERL6kWYpgUWE4ZBJYsoUiJTJ6LJbyGAp7BTpxBxetxaktj4smzA8ehiAJOjMvBiDuXSKGXA8TK-KekRAA */
  id: "notes",
  tsTypes: {} as import("./notesMachine.typegen").Typegen0,
  context: {
    notes: [] as import("../../domain/models/Note").Note[],
  },
  initial: "loading",
  predictableActionArguments: true,
  preserveActionOrder: true,
  states: {
    loading: {
      entry: ["notify: is loading"],
      invoke: {
        src: "UseCase: Load Notes",
        onDone: "idle",
        onError: "error",
      },
      tags: ["loading"],
    },

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
          target: "saving",
        },
      },
    },

    error: {
      entry: ["notify: has error"],
      tags: ["error"],
      type: "final",
    },

    saving: {
      invoke: {
        src: "UseCase: Save Note",
        onDone: "idle",
        onError: "error",
      },
      tags: ["loading"],
    },
  },
});
