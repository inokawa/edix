import { useEffect, useRef, useState } from "react";
import { editable, plainSchema } from "edix";

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(
    "Hello World.\nこんにちは。\n👍❤️🧑‍🧑‍🧒"
  );
  useEffect(() => {
    return editable(ref.current!, {
      schema: plainSchema({ multiline: true }),
      onChange: setValue,
    }).dispose;
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
