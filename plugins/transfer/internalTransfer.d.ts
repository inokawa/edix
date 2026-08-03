import { Editor } from '../../editor.js';
/**
 * A plugin to handle copying / pasting between editor instances
 *
 * @param options.mime A MIME type to store the copied fragment in clipboard. Give an app specific one if the schema is not shared with other editate based apps.
 * @defaultValue `"application/x-editate-editor"`
 */
export declare function internalTransferPlugin(editor: Editor, options?: {
    mime?: string;
}): void;
