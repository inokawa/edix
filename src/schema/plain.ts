import { docToString, stringToFragment } from "../doc/utils.js";
import type { DocSchema } from "./types.js";

/**
 * @deprecated
 */
export const plainSchema = ({
  multiline,
}: {
  multiline?: boolean;
} = {}): DocSchema<string> => {
  return {
    single: !multiline,
    js: docToString,
    doc: stringToFragment,
  };
};
