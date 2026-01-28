import Alpine from "alpinejs";
import { createEditor, plainSchema } from "edix";

Alpine.directive("editable", (el, _, { cleanup }) => {
  const data = Alpine.$data(el) as { value: string };
  const editor = createEditor({
    doc: data.value,
    schema: plainSchema({ multiline: true }),
    onChange: (v) => {
      data.value = v;
    },
  });
  const dispose = editor.input(el);
  cleanup(() => {
    dispose();
  });
});

(window as any).Alpine = Alpine;

Alpine.start();
