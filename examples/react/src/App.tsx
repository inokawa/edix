import { useEffect, useRef, useState } from "react";
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

function App() {
  const ref = useRef<HTMLDivElement>(null);
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

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: "white",
        border: "solid 1px darkgray",
        padding: 8,
      }}
    >
      {doc.children.map((b, i) => (
        <div key={i}>
          {b.children.map((n, j) => (
            <span key={j}>{n.text || <br />}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
