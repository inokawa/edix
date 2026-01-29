<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { createPlainEditor } from "edix";

const value = ref("Hello world.\nこんにちは。\n👍❤️🧑‍🧑‍🧒")
const element = ref<HTMLDivElement>()
let cleanup: (() => void) | null = null
onMounted(() => {
  cleanup = createPlainEditor({
    text: value.value,
    onChange: (v) => {
      value.value = v
    },
  }).input(element.value!)
})
onUnmounted(() => {
  cleanup?.()
})
</script>

<template>
  <div ref="element" class="editor">
    <div v-for="(t, i) in value.split('\n')">
      <span :key="i" v-if="t">{{ t }}</span>
      <br v-else />
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
