<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { createEditor, plainSchema, type Editor } from "edix";

  let value = $state("Hello world.\nこんにちは。\n👍❤️🧑‍🧑‍🧒");
  let ref: HTMLElement | undefined = $state();
  let cleanup: (() => void) | null = null;
  onMount(() => {
    cleanup = createEditor({
      doc: value,
      schema: plainSchema({ multiline: true }),
      onChange: (v) => {
        value = v;
      },
    }).input(ref!);
  });
  onDestroy(() => {
    cleanup?.();
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
