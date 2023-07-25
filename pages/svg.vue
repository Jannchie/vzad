<script setup lang="ts">
import WorkspaceSVG from '~/components/WorkspaceSVG.vue'

const workspaceRef = ref<InstanceType<typeof WorkspaceSVG>>()
const data = useData()
const connections = useConnections()
const dataKeys = Object.keys(data)
const connectionKeys = Object.keys(connections)
</script>

<template>
  <div class="fixed border-b border-neutral-800 z-1 w-full bg-neutral-900 p-2 text-base text-center">
    Zoom & Pan & Drag Demo (SVG)
  </div>
  <WorkspaceSVG ref="workspaceRef">
    <g v-if="workspaceRef">
      <DraggableItemSVG v-for="key in dataKeys" :key="key" v-model:data="data[key]" />
      <DraggableLinkSVG v-for="key in connectionKeys" :key="key" v-model:data="connections[key]" />
    </g>
  </WorkspaceSVG>
</template>
