<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { editable, plainSchema, type EditableHandle } from "edix";

  let value = $state("Hello world.\nこんにちは。\n👍❤️🧑‍🧑‍🧒");
  let ref: HTMLElement | undefined = $state();
  let editor: EditableHandle | null = null;
  onMount(() => {
    editor = editable(ref!, {
      doc: value,
      schema: plainSchema({ multiline: true }),
      onChange: (v) => {
        value = v;
      },
    });
  });
  onDestroy(() => {
    editor?.dispose();
  });
</script>

<div bind:this={ref} class="editor">
  {#each value.split("\n") as t, i (i)}
    <div>
      {#if t}
        {t}
      {:else}
        <br />
      {/if}
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
