import { Transaction } from "../doc/edit.js";
import type { DocBase, SelectionSnapshot } from "../doc/types.js";

/**
 * @internal
 */
export interface PluginObject {
  apply?: (
    next: (tr: Transaction) => [DocBase, SelectionSnapshot] | undefined,
    tr: Transaction,
  ) => [DocBase, SelectionSnapshot] | undefined;
  mount?: (element: HTMLElement) => void;
}

/**
 * @internal
 */
export type EditorPlugin = () => PluginObject;
