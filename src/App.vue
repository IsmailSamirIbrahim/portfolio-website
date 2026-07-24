<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

import PortfolioFallback from '@/components/PortfolioFallback.vue'
import { useImmersiveMode } from '@/composables/useImmersiveMode'

const ImmersiveScene = defineAsyncComponent({
  loader: () => import('@/components/ImmersiveScene.vue'),
  delay: 0,
  timeout: 10_000,
  onError(_error, _retry, fail) {
    fail()
  },
})

const {
  disableImmersiveMode,
  immersiveEnabled,
  markFailed,
  markReady,
  message,
  phase,
  reducedMotion,
  requestImmersiveMode,
  webGLAvailable,
} = useImmersiveMode()
</script>

<template>
  <div class="app-root">
    <Transition name="immersive">
      <Suspense v-if="immersiveEnabled">
        <ImmersiveScene
          :reduced-motion="reducedMotion"
          @failed="markFailed"
          @ready="markReady"
        />
        <template #fallback>
          <div class="immersive-loading" role="status" aria-live="polite">
            <span class="visually-hidden">
              Loading the optional immersive experience.
            </span>
          </div>
        </template>
      </Suspense>
    </Transition>

    <PortfolioFallback
      :immersive-active="immersiveEnabled"
      :immersive-phase="phase"
      :immersive-status="message"
      :web-g-l-available="webGLAvailable"
      @disable-immersive="disableImmersiveMode"
      @request-immersive="requestImmersiveMode"
    />
  </div>
</template>
