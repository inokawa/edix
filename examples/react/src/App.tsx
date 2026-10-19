import { useEffect, useMemo, useRef, useState } from "react";
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

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const [doc, setDoc] = useState<Doc>(initialDoc);
  const editor = useMemo(() => {
    const e = createEditor({
      doc: initialDoc,
      schema: schema,
    })
      .exec(plainTransferPlugin)
      .exec(nodeIdPlugin);
    e.on("change", () => {
      setDoc(e.doc);
    });
    return e;
  }, []);
  useEffect(() => {
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

export default App;
