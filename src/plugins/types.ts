import { Transaction } from "../doc/edit.js";
import type { DocBase, SelectionSnapshot } from "../doc/types.js";

export interface PluginObject {
  apply?: (
    next: (tr: Transaction) => [DocBase, SelectionSnapshot] | undefined,
    tr: Transaction,
  ) => [DocBase, SelectionSnapshot] | undefined;
  mount?: (element: HTMLElement) => void;
}

export type EditorPlugin = () => PluginObject;
