<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'

const props = defineProps<{
  reducedMotion: boolean
}>()

const emit = defineEmits<{
  failed: []
  ready: []
}>()

let readyTimer: number | undefined

onMounted(() => {
  try {
    // PORT-35 replaces this lightweight boundary with the real Three.js scene.
    // Keeping it async now proves the 3D bundle can remain outside the initial
    // production chunk while the accessible HTML portfolio stays visible.
    readyTimer = window.setTimeout(() => {
      emit('ready')
    }, props.reducedMotion ? 0 : 250)
  } catch {
    emit('failed')
  }
})

onBeforeUnmount(() => {
  window.clearTimeout(readyTimer)
})
</script>

<template>
  <div
    class="immersive-scene"
    role="img"
    aria-label="Optional abstract preview of the future immersive engineering room"
  >
    <div class="immersive-scene__grid" />
    <div class="immersive-scene__orb immersive-scene__orb--blue" />
    <div class="immersive-scene__orb immersive-scene__orb--orange" />
  </div>
</template>
