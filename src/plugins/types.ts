import { type Operation } from "../doc/edit.js";

export interface EditorPlugin {
  apply?: (op: Operation, next: (op?: Operation) => void) => void;
  mount?: (element: HTMLElement) => void | (() => void);
}
