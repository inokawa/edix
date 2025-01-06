import { useEffect, useRef, useState } from "preact/hooks";
import { editable } from "edix";

export function App() {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("Hello World.\nこんにちは。\n👍❤️🧑‍🧑‍🧒");
  useEffect(() => {
    if (!ref.current) return;
    return editable(ref.current, {
      multiline: true,
      onChange: setValue,
    });
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
      {value.split("\n").map((t, i) => (
        <div key={i}>{t ? t : <br />}</div>
      ))}
    </div>
  );
}
