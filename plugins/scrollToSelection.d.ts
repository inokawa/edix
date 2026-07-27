import { Editor } from '../editor.js';
export interface ScrollToSelectionOptions {
    /**
     * Scroll smoothly instead of jumping.
     * @default false
     */
    smooth?: boolean;
}
/**
 * A plugin to scroll to the selection on document change.
 */
export declare const scrollToSelectionPlugin: (editor: Editor, { smooth }?: ScrollToSelectionOptions) => void;
