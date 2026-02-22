import { Transaction } from "../doc/edit.js";

export interface PluginObject {
  apply?: (tr: Transaction, next: (tr?: Transaction) => void) => void;
  mount?: (element: HTMLElement) => void;
}

export type EditorPlugin = () => PluginObject;
