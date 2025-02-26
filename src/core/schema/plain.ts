import type { DomSnapshot } from "../types";
import type { EditableSchema } from "./types";

const serializeToString = (snapshot: DomSnapshot): string => {
  return snapshot.reduce((acc, r, i) => {
    if (i !== 0) {
      acc += "\n";
    }
    return (
      acc + r.reduce((acc, n) => acc + (typeof n === "string" ? n : ""), "")
    );
  }, "");
};

/**
 * Defines plain text schema.
 */
export const plainSchema = ({
  multiline,
}: {
  multiline?: boolean;
} = {}): EditableSchema<string> => {
  return {
    single: !multiline,
    data: serializeToString,
    plain: serializeToString,
  };
};
