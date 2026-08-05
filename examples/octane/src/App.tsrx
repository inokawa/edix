import { useEffect, useRef, useState } from "octane";
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

export function App() @{
  const ref = useRef<HTMLDivElement | null>(null);
  const [doc, setDoc] = useState<Doc>(initialDoc);
  useEffect(() => {
    const editor = createEditor({
      doc: initialDoc,
      schema: schema,
    }).exec(plainTransferPlugin);
    editor.on("change", () => {
      setDoc(editor.doc);
    });
    return editor.input(ref.current!);
  }, []);

  <div
    ref={ref}
    style={{
      backgroundColor: "white",
      border: "solid 1px darkgray",
      padding: 8,
    }}
  >
    @for (const b of doc.children; key b) {
      <div>
        @for (const n of b.children; key n) {
          <span>
            @if (n.text) {
              <>{n.text as string}</>
            } @else {
              <br />
            }
          </span>
        }
      </div>
    }
  </div>
}
