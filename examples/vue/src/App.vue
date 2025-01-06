<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { editable, EditableHandle } from "edix";

const value = ref("Hello World.\nこんにちは。\n👍❤️🧑‍🧑‍🧒")
const element = ref<HTMLDivElement>()
let cleanup: EditableHandle | null = null
onMounted(() => {
  cleanup = editable(element.value!, {
    multiline: true,
    onChange: (v) => {
      value.value = v
    },
  });
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
