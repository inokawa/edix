<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { createPlainEditor } from "edix";

  let text = $state("Hello world.\nこんにちは。\n👍❤️🧑‍🧑‍🧒");
  let ref: HTMLElement | undefined = $state();
  let cleanup: (() => void) | null = null;
  onMount(() => {
    cleanup = createPlainEditor({
      text: text,
      onChange: (v) => {
        text = v;
      },
    }).input(ref!);
  });
  onDestroy(() => {
    cleanup?.();
  });
</script>

<div bind:this={ref} class="editor">
  {#each text.split("\n") as t, i (i)}
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
