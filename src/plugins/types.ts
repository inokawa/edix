import { Transaction } from "../doc/edit.js";
import type { Doc, SelectionSnapshot } from "../doc/types.js";

/**
 * @internal
 */
export interface PluginObject {
  apply?: (
    next: (tr: Transaction) => [Doc, SelectionSnapshot] | undefined,
    tr: Transaction,
  ) => [Doc, SelectionSnapshot] | undefined;
  mount?: (element: HTMLElement) => void;
}

/**
 * @internal
 */
export type EditorPlugin = () => PluginObject;
