import { editable } from "edix";
import morphdom from "morphdom";

const root = document.getElementById("root")!;

const el = document.createElement("div");
el.style.backgroundColor = "white";
el.style.border = "solid 1px darkgray";
el.style.padding = "8px";

root.appendChild(el);

const updateRows = (text: string) => {
  let rows = "";
  for (const t of text.split("\n")) {
    rows += `<div>${t ? t : "<br />"}</div>`;
  }

  morphdom(el, `<div>${rows}</div>`, { childrenOnly: true });
};

updateRows("Hello World.\nこんにちは。\n👍❤️🧑‍🧑‍🧒");

const cleanup = editable(el, {
  onChange: (v) => {
    updateRows(v);
  },
});
