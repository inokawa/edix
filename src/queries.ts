import { sliceDoc } from "./doc/edit";
import { edges } from "./doc/position";
import type {
  DocFragment,
  PositionRange,
  SelectionSnapshot,
} from "./doc/types";
import { docToString } from "./doc/utils";

export type EditableQuery<A extends unknown[], V> = (
  doc: DocFragment,
  selection: SelectionSnapshot,
  ...args: A
) => V;

export const SelectedText: EditableQuery<[], string> = (doc, selection) => {
  return docToString(sliceDoc(doc, ...edges(...selection)));
};

export const SelectedNodes: EditableQuery<[], DocFragment> = (
  doc,
  selection
) => {
  return sliceDoc(doc, ...edges(...selection));
};

export const SelectedRange: EditableQuery<[], PositionRange> = (
  _doc,
  selection
) => {
  return edges(...selection);
};
