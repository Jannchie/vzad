<script setup lang="ts">
import Workspace from '~/components/Workspace.vue'

const workspaceRef = ref<InstanceType<typeof Workspace>>()
const data = useData()
const keys = Object.keys(data)
</script>

<template>
  <div class="fixed border-b border-neutral-800 z-1 w-full bg-neutral-900 p-2 text-base text-center">
    Zoom & Pan & Drag Demo (HTML)
  </div>
  <Workspace ref="workspaceRef">
    <div v-if="workspaceRef">
      <DraggableItem
        v-for="key in keys" :id="key" :key="key"
        :transform-source="workspaceRef?.transformSource"
      />
    </div>
  </Workspace>
</template>
