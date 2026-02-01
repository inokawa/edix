import type { Fragment } from "../../doc/types.js";

export type CopyExtension = (
  dataTransfer: DataTransfer,
  doc: Fragment,
  element: Element,
) => void;
