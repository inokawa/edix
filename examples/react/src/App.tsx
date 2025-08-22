import { useEffect, useRef, useState } from "react";
import { createEditor, plainSchema } from "edix";

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(
    "Hello world.\nこんにちは。\n👍❤️🧑‍🧑‍🧒"
  );
  useEffect(() => {
    return createEditor({
      doc: value,
      schema: plainSchema({ multiline: true }),
      onChange: setValue,
    }).input(ref.current!);
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

export default App;
