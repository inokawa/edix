import { Fragment, Path, Range } from './types.js';
declare const OP_DELETE = "delete";
type DeleteOperation = Readonly<{
    type: typeof OP_DELETE;
    range: Range;
}>;
declare const OP_INSERT_TEXT = "insert_text";
type InsertTextOperation = Readonly<{
    type: typeof OP_INSERT_TEXT;
    at: number;
    text: string;
}>;
declare const OP_INSERT_NODE = "insert_node";
type InsertNodeOperation = Readonly<{
    type: typeof OP_INSERT_NODE;
    at: number;
    fragment: Fragment;
}>;
declare const OP_FORMAT = "format";
type FormatOperation = Readonly<{
    type: typeof OP_FORMAT;
    range: Range;
    key: string;
    value: unknown;
}>;
declare const OP_PATCH_NODE = "patch_node";
type PatchNodeOperation = Readonly<{
    type: typeof OP_PATCH_NODE;
    path: Path;
    key: string;
    value: unknown;
}>;
export type Operation = DeleteOperation | InsertTextOperation | InsertNodeOperation | FormatOperation | PatchNodeOperation;
/**
 * Remap a position through the given operation.
 * @param stickBefore `true` to keep the position in place when content is inserted at it, instead of moving it after the inserted content.
 */
export declare const mapPosition: (position: number, op: Operation, stickBefore?: boolean) => number;
export {};
