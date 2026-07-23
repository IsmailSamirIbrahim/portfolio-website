import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import type { ImmersivePhase } from '@/types/immersive'

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    const context =
      canvas.getContext('webgl2') ??
      canvas.getContext('webgl') ??
      canvas.getContext('experimental-webgl')

    return context !== null
  } catch {
    return false
  }
}

export function useImmersiveMode() {
  const webGLAvailable = ref(false)
  const reducedMotion = ref(false)
  const requested = ref(false)
  const phase = ref<ImmersivePhase>('idle')
  const message = ref('')
  let motionQuery: MediaQueryList | undefined

  const immersiveEnabled = computed(
    () => requested.value && webGLAvailable.value,
  )

  function syncMotionPreference(event?: MediaQueryListEvent) {
    reducedMotion.value = event?.matches ?? motionQuery?.matches ?? false
  }

  function requestImmersiveMode() {
    if (!webGLAvailable.value) {
      phase.value = 'unavailable'
      message.value =
        'The immersive view is unavailable on this device. The complete portfolio remains accessible below.'
      return
    }

    requested.value = true
    phase.value = 'loading'
    message.value = 'Loading the optional immersive layer.'
  }

  function markReady() {
    phase.value = 'ready'
    message.value = reducedMotion.value
      ? 'Immersive view loaded with reduced motion.'
      : 'Immersive view loaded.'
  }

  function markFailed() {
    requested.value = false
    phase.value = 'error'
    message.value =
      'The immersive view could not load. The complete 2D portfolio is still available.'
  }

  function disableImmersiveMode() {
    requested.value = false
    phase.value = webGLAvailable.value ? 'idle' : 'unavailable'
    message.value = 'Immersive view disabled.'
  }

  onMounted(() => {
    webGLAvailable.value = supportsWebGL()
    phase.value = webGLAvailable.value ? 'idle' : 'unavailable'

    motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    syncMotionPreference()
    motionQuery.addEventListener('change', syncMotionPreference)
  })

  onBeforeUnmount(() => {
    motionQuery?.removeEventListener('change', syncMotionPreference)
  })

  return {
    disableImmersiveMode,
    immersiveEnabled,
    markFailed,
    markReady,
    message,
    phase,
    reducedMotion,
    requestImmersiveMode,
    webGLAvailable,
  }
}
