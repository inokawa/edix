import {
  createEditor,
  plainTransferPlugin,
  nodeIdPlugin,
  NodeId,
} from "editate";
import morphdom from "morphdom";
import * as z from "zod";

const schema = z.strictObject({
  children: z.array(
    z.strictObject({
      children: z.array(
        z.strictObject({
          text: z.string(),
        }),
      ),
    }),
  ),
});

type Doc = z.infer<typeof schema>;

const initialDoc: Doc = {
  children: [
    { children: [{ text: "Hello world." }] },
    { children: [{ text: "こんにちは。" }] },
    { children: [{ text: "👍❤️🧑‍🧑‍🧒" }] },
  ],
};

const root = document.getElementById("root")!;

const el = document.createElement("div");
el.style.backgroundColor = "white";
el.style.border = "solid 1px darkgray";
el.style.padding = "8px";

root.appendChild(el);

const editor = createEditor({
  doc: initialDoc,
  schema: schema,
})
  .exec(plainTransferPlugin)
  .exec(nodeIdPlugin);

// morphdom matches elements by their id, so give it the id of each node
const updateRows = (doc: Doc) => {
  let rows = "";
  for (const b of doc.children) {
    let leaves = "";
    for (const n of b.children) {
      leaves += `<span id="${NodeId(editor, n)}">${n.text ? n.text : "<br />"}</span>`;
    }
    rows += `<div id="${NodeId(editor, b)}">${leaves}</div>`;
  }

  morphdom(el, `<div>${rows}</div>`, { childrenOnly: true });
};

updateRows(initialDoc);

editor.on("change", () => {
  updateRows(editor.doc);
});
editor.input(el);
