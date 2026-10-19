<script setup lang="ts">
import { onMounted, onUnmounted, ref, shallowRef } from 'vue';
import { createEditor, plainTransferPlugin, nodeIdPlugin, NodeId } from "editate";
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
const editor = createEditor({
  doc: initialDoc,
  schema: schema,
})
  .exec(plainTransferPlugin)
  .exec(nodeIdPlugin)
editor.on("change", () => {
  doc.value = editor.doc
})
onMounted(() => {
  cleanup = editor.input(element.value!)
})
onUnmounted(() => {
  cleanup?.()
})
</script>

<template>
  <div ref="element" class="editor">
    <div v-for="b in doc.children" :key="NodeId(editor, b)">
      <span v-for="n in b.children" :key="NodeId(editor, n)">
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
