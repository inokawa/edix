import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { editable } from "edix";

export const App = component$(() => {
  const value = useSignal("Hello World.\nこんにちは。\n👍❤️🧑‍🧑‍🧒");
  const ref = useSignal<HTMLDivElement>();

  useVisibleTask$(({ cleanup }) => {
    if (!ref.value) return;
    const handle = editable(ref.value, {
      multiline: true,
      onChange: (v) => {
        value.value = v;
      },
    });
    cleanup(() => {
      handle();
    });
  });

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: "white",
        border: "solid 1px darkgray",
        padding: 8,
      }}
    >
      {value.value.split("\n").map((t, i) => (
        <div key={i}>{t ? t : <br />}</div>
      ))}
    </div>
  );
});
