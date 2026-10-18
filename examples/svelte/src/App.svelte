<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import {
    createEditor,
    plainTransferPlugin,
    nodeIdPlugin,
    NodeId,
  } from "editate";
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

  // nodes must not be wrapped by a proxy to keep their ids
  let doc: Doc = $state.raw(initialDoc);
  let ref: HTMLElement | undefined = $state();
  let cleanup: (() => void) | null = null;
  const editor = createEditor({
    doc: initialDoc,
    schema: schema,
  })
    .exec(plainTransferPlugin)
    .exec(nodeIdPlugin);
  editor.on("change", () => {
    doc = editor.doc;
  });
  onMount(() => {
    cleanup = editor.input(ref!);
  });
  onDestroy(() => {
    cleanup?.();
  });
</script>

<div bind:this={ref} class="editor">
  {#each doc.children as b (NodeId(editor, b))}
    <div>
      {#each b.children as n (NodeId(editor, n))}<span
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
