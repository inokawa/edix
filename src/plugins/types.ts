import { type Operation } from "../doc/edit.js";

export interface PluginObject {
  apply?: (op: Operation, next: (op?: Operation) => void) => void;
  mount?: (element: HTMLElement) => void | (() => void);
}

export type EditorPlugin = () => PluginObject;
