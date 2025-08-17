import { createMemo, createSignal, For, onCleanup, onMount } from "solid-js";
import { editable, plainSchema } from "edix";

function App() {
  let ref: HTMLDivElement | undefined;
  const [value, setValue] = createSignal(
    "Hello world.\nこんにちは。\n👍❤️🧑‍🧑‍🧒"
  );
  onMount(() => {
    const editor = editable(ref!, {
      schema: plainSchema({ multiline: true }),
      onChange: setValue,
    });
    onCleanup(() => {
      editor.dispose();
    });
  });

  return (
    <div
      ref={ref}
      style={{
        "background-color": "white",
        border: "solid 1px darkgray",
        padding: "8px",
      }}
    >
      <For each={createMemo(() => value().split("\n"))()}>
        {(t) => <div>{t ? t : <br />}</div>}
      </For>
    </div>
  );
}

export default App;
