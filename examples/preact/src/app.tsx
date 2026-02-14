import { useEffect, useRef, useState } from "preact/hooks";
import { createPlainEditor } from "edix";

export function App() {
  const ref = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("Hello world.\nこんにちは。\n👍❤️🧑‍🧑‍🧒");
  useEffect(() => {
    if (!ref.current) return;
    return createPlainEditor({
      text: text,
      onChange: setText,
    }).input(ref.current);
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
      {text.split("\n").map((t, i) => (
        <div key={i}>{t ? t : <br />}</div>
      ))}
    </div>
  );
}
