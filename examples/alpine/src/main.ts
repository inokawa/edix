import Alpine from "alpinejs";
import {
  createEditor,
  plainTransferPlugin,
  nodeIdPlugin,
  NodeId,
  type InferBlockNode,
  type InferInlineNode,
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

const editor = createEditor({
  doc: initialDoc,
  schema: schema,
})
  .exec(plainTransferPlugin)
  .exec(nodeIdPlugin);

Alpine.data("editor", () => ({
  doc: initialDoc,
  // a node is wrapped by a reactive proxy in the template, so unwrap it to get its id
  id: (node: InferBlockNode<Doc> | InferInlineNode<Doc>) =>
    NodeId(editor, Alpine.raw(node)),
}));

Alpine.directive("editable", (el, _, { cleanup }) => {
  const data = Alpine.$data(el) as { doc: Doc };
  editor.on("change", () => {
    data.doc = editor.doc;
  });
  const dispose = editor.input(el);
  cleanup(() => {
    dispose();
  });
});

(window as any).Alpine = Alpine;

Alpine.start();
