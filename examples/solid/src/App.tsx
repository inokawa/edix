import { createMemo, createSignal, For, onCleanup, onMount } from "solid-js";
import { editable } from "edix";

function App() {
  let ref: HTMLDivElement | undefined;
  const [value, setValue] = createSignal("Hello World.\nこんにちは。\n👍❤️🧑‍🧑‍🧒");
  onMount(() => {
    const cleanup = editable(ref!, {
      onChange: setValue,
    });
    onCleanup(() => {
      cleanup();
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
