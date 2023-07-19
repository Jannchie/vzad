<script setup lang="ts">
import Workspace from '~/components/Workspace.vue'

const workspaceRef = ref<InstanceType<typeof Workspace>>()
</script>

<template>
  <Workspace ref="workspaceRef">
    <DraggableItem :transform-source="workspaceRef?.transformSource" />
    <DraggableItem :transform-source="workspaceRef?.transformSource" />
  </Workspace>
</template>
