// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.notes.loading:invocation[0]": {
      type: "done.invoke.notes.loading:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.notes.saving:invocation[0]": {
      type: "done.invoke.notes.saving:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.notes.loading:invocation[0]": {
      type: "error.platform.notes.loading:invocation[0]";
      data: unknown;
    };
    "error.platform.notes.saving:invocation[0]": {
      type: "error.platform.notes.saving:invocation[0]";
      data: unknown;
    };
    "xstate.after(2000)#notes.editing": {
      type: "xstate.after(2000)#notes.editing";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    "UseCase: Load Notes": "done.invoke.notes.loading:invocation[0]";
    "UseCase: Save Note": "done.invoke.notes.saving:invocation[0]";
  };
  missingImplementations: {
    actions: "notify: has error";
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    "assign: all notes": "done.invoke.notes.loading:invocation[0]";
    "assign: append notes": "done.invoke.notes.saving:invocation[0]";
    "notify: has error":
      | "error.platform.notes.loading:invocation[0]"
      | "error.platform.notes.saving:invocation[0]";
    "notify: is loading": "xstate.init";
    "spawn note machines": "done.invoke.notes.loading:invocation[0]";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    "UseCase: Load Notes": "xstate.init";
    "UseCase: Save Note": "xstate.after(2000)#notes.editing";
  };
  matchesStates: "editing" | "error" | "idle" | "loading" | "saving";
  tags: "error" | "loading";
}
