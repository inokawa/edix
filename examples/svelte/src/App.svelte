<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { editable, type EditableHandle } from "edix";

  let value = $state("Hello World.\nこんにちは。\n👍❤️🧑‍🧑‍🧒");
  let ref: HTMLElement | undefined = $state();
  let cleanup: EditableHandle | null = null;
  onMount(() => {
    cleanup = editable(ref!, {
      multiline: true,
      onChange: (v) => {
        value = v;
      },
    });
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
