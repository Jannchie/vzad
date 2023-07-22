<script setup lang="ts">
import WorkspaceSVG from '~/components/WorkspaceSVG.vue'

const workspaceRef = ref<InstanceType<typeof WorkspaceSVG>>()
const data = useData()
const keys = Object.keys(data)
</script>

<template>
  <div class="fixed border-b border-neutral-800 z-1 w-full bg-neutral-900 p-2 text-base text-center">
    Zoom & Pan & Drag Demo (SVG)
  </div>
  <WorkspaceSVG ref="workspaceRef">
    <g v-if="workspaceRef">
      <DraggableItemSVG
        v-for="key in keys" :id="key" :key="key"
        :transform-source="workspaceRef?.transformSource"
        :position-source="workspaceRef?.positionSource"
      />
    </g>
  </WorkspaceSVG>
</template>
