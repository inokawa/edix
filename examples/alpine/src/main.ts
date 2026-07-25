import Alpine from "alpinejs";
import { createEditor, plainTransferPlugin } from "editate";
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

Alpine.data("editor", () => ({ doc: initialDoc }));

Alpine.directive("editable", (el, _, { cleanup }) => {
  const data = Alpine.$data(el) as { doc: Doc };
  const editor = createEditor({
    doc: initialDoc,
    schema: schema,
  }).exec(plainTransferPlugin);
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
