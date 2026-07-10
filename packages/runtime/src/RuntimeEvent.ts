import type { Event } from "@atlas/kernel";

export type RuntimeEvent =
  | (Event & Readonly<{
      type:
        | "runtime.initialized"
        | "runtime.started"
        | "runtime.stopped"
        | "runtime.disposed";
    }>)
  | (Event & Readonly<{
      type:
        | "runtime.module.initialized"
        | "runtime.module.stopped"
        | "runtime.module.disposed";
      moduleId: string;
    }>);
