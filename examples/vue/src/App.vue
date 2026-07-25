<script setup lang="ts">
import { onMounted, onUnmounted, ref, shallowRef } from 'vue';
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
})

type Doc = z.infer<typeof schema>

const initialDoc: Doc = {
  children: [
    { children: [{ text: "Hello world." }] },
    { children: [{ text: "こんにちは。" }] },
    { children: [{ text: "👍❤️🧑‍🧑‍🧒" }] },
  ],
}

const doc = shallowRef<Doc>(initialDoc)
const element = ref<HTMLDivElement>()
let cleanup: (() => void) | null = null
onMounted(() => {
  const editor = createEditor({
    doc: initialDoc,
    schema: schema,
  }).exec(plainTransferPlugin)
  editor.on("change", () => {
    doc.value = editor.doc
  })
  cleanup = editor.input(element.value!)
})
onUnmounted(() => {
  cleanup?.()
})
</script>

<template>
  <div ref="element" class="editor">
    <div v-for="(b, i) in doc.children" :key="i">
      <span v-for="(n, j) in b.children" :key="j">
        <template v-if="n.text">{{ n.text }}</template>
        <br v-else />
      </span>
    </div>
  </div>
</template>

<style scoped>
.editor {
  background-color: white;
  border: solid 1px darkgray;
  padding: 8px;
}
</style>
