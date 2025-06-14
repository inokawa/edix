<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { editable, Editor, plainSchema } from "edix";

const value = ref("Hello World.\nこんにちは。\n👍❤️🧑‍🧑‍🧒")
const element = ref<HTMLDivElement>()
let editor: Editor | null = null
onMounted(() => {
  editor = editable(element.value!, {
    schema: plainSchema({ multiline: true }),
    onChange: (v) => {
      value.value = v
    },
  });
})
onUnmounted(() => {
  editor?.dispose()
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
