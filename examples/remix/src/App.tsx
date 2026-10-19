import { css, ref, type Handle } from "remix/component";
import {
  createEditor,
  plainTransferPlugin,
  nodeIdPlugin,
  NodeId,
} from "editate";
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

const editorStyle = css({
  backgroundColor: "white",
  border: "solid 1px darkgray",
  padding: 8,
});

export function App(handle: Handle) {
  let doc: Doc = initialDoc;
  const editor = createEditor({
    doc: initialDoc,
    schema: schema,
  })
    .exec(plainTransferPlugin)
    .exec(nodeIdPlugin);
  editor.on("change", () => {
    doc = editor.doc;
    handle.update();
  });

  return () => (
    <div
      mix={[
        editorStyle,
        ref((node, signal) => {
          signal.addEventListener("abort", editor.input(node));
        }),
      ]}
    >
      {doc.children.map((b) => (
        <div key={NodeId(editor, b)}>
          {b.children.map((n) => (
            <span key={NodeId(editor, n)}>{n.text || <br />}</span>
          ))}
        </div>
      ))}
    </div>
  );
}
