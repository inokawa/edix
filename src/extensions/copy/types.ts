import type { DocFragment } from "../../doc/types.js";

export type CopyExtension = (
  dataTransfer: DataTransfer,
  doc: DocFragment,
  element: Element,
) => void;
