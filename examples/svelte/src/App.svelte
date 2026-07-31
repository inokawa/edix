<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { createEditor, plainTransferPlugin } from "editate";
  import * as z from "zod";

  const schema = z.strictObject({
    children: z.array(
      z.strictObject({
        children: z.array(
          z.strictObject({
            text: z.string(),
          }),
        ),
      }),
    ),
  });

  type Doc = z.infer<typeof schema>;

  const initialDoc: Doc = {
    children: [
      { children: [{ text: "Hello world." }] },
      { children: [{ text: "こんにちは。" }] },
      { children: [{ text: "👍❤️🧑‍🧑‍🧒" }] },
    ],
  };

  let doc: Doc = $state(initialDoc);
  let ref: HTMLElement | undefined = $state();
  let cleanup: (() => void) | null = null;
  onMount(() => {
    const editor = createEditor({
      doc: initialDoc,
      schema: schema,
    }).exec(plainTransferPlugin);
    editor.on("change", () => {
      doc = editor.doc;
    });
    cleanup = editor.input(ref!);
  });
  onDestroy(() => {
    cleanup?.();
  });
</script>

<div bind:this={ref} class="editor">
  {#each doc.children as b, i (i)}
    <div>
      {#each b.children as n, j (j)}<span
          >{#if n.text}{n.text}{:else}<br />{/if}</span
        >{/each}
    </div>
  {/each}
</div>

<style>
  .editor {
    background-color: white;
    border: solid 1px darkgray;
    padding: 8px;
  }
</style>
