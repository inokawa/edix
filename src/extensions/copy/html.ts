import { getDOMSelection, getSelectionRangeInEditor } from "../../dom/index.js";
import type { CopyExtension } from "./types.js";

export const htmlCopy = (): CopyExtension => {
  return (dataTransfer, _, element) => {
    // TODO customizable dom to standard schema
    const wrapper = document.createElement("div");
    wrapper.appendChild(
      // DOM range must exist here
      getSelectionRangeInEditor(
        getDOMSelection(element),
        element,
      )!.cloneContents(),
    );
    dataTransfer.setData("text/html", wrapper.innerHTML);
  };
};
