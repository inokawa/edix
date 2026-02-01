import type { Fragment } from "../../doc/types.js";
import type { ParserConfig } from "../../dom/parser.js";

export type PasteExtension = (
  dataTransfer: DataTransfer,
  config: ParserConfig,
) => Fragment | null;
