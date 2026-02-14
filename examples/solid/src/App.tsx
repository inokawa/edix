import { createMemo, createSignal, For, onCleanup, onMount } from "solid-js";
import { createPlainEditor } from "edix";

function App() {
  let ref: HTMLDivElement | undefined;
  const [text, setText] = createSignal("Hello world.\nこんにちは。\n👍❤️🧑‍🧑‍🧒");
  onMount(() => {
    const editor = createPlainEditor({
      text: text(),
      onChange: setText,
    });
    const dispose = editor.input(ref!);
    onCleanup(() => {
      dispose();
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
      <For each={createMemo(() => text().split("\n"))()}>
        {(t) => <div>{t ? t : <br />}</div>}
      </For>
    </div>
  );
}

export default App;
