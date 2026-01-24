import { Transaction } from "../doc/edit.js";
import type { DocFragment, SelectionSnapshot } from "../doc/types.js";

/**
 * @internal
 */
export interface PluginObject {
  apply?: (
    next: (tr: Transaction) => [DocFragment, SelectionSnapshot] | undefined,
    tr: Transaction,
  ) => [DocFragment, SelectionSnapshot] | undefined
  mount?: (element: HTMLElement) => void
}

/**
 * @internal
 */
export type EditorPlugin = () => PluginObject;
