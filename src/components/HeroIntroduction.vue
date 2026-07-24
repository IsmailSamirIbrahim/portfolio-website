<script setup lang="ts">
import type { ImmersivePhase } from '@/types/immersive'

defineProps<{
  immersiveActive: boolean
  immersivePhase: ImmersivePhase
  immersiveStatus: string
  webGLAvailable: boolean
}>()

const emit = defineEmits<{
  disableImmersive: []
  requestImmersive: []
}>()
</script>

<template>
  <section id="top" class="hero" aria-labelledby="hero-title">
    <div class="hero__copy">
      <p class="eyebrow">Cairo, Egypt · Open to opportunities</p>
      <p class="hero__identity">Ismail Samir Ibrahim</p>
      <h1 id="hero-title">
        <span class="hero__role-primary">Senior C++</span>
        <span class="hero__role-secondary">Software Engineer</span>
      </h1>
      <p class="hero__statement">
        Building high-performance software where precision matters.
      </p>
      <p class="hero__lede">
        I bring 8+ years of production experience across dental AI, medical
        imaging, and Arabic NLP—turning complex systems into dependable,
        polished products.
      </p>

      <ul class="hero__specialties" aria-label="Primary specialties">
        <li>Modern C++</li>
        <li>Qt / QML</li>
        <li>Architecture</li>
        <li>Performance</li>
      </ul>

      <div class="action-row">
        <a class="button button--primary" href="#projects">
          Explore my work
          <span aria-hidden="true">↓</span>
        </a>
        <a class="button" href="mailto:ismail.samir.ibrahim@gmail.com">
          Get in touch
        </a>
      </div>
    </div>

    <aside
      class="hero__stage"
      :class="{ 'hero__stage--immersive': immersiveActive }"
      aria-label="Engineering profile"
    >
      <div v-if="!immersiveActive" class="hero__blueprint" aria-hidden="true">
        <span class="hero__blueprint-label">Engineering systems</span>
        <strong>C++</strong>
        <div class="hero__blueprint-orbit">
          <span>01</span>
          <span>08+</span>
          <span>∞</span>
        </div>
        <p>Precision / Performance / Products</p>
      </div>

      <div class="hero__facts">
        <div>
          <strong>8+</strong>
          <span>Years building production software</span>
        </div>
        <div>
          <strong>3</strong>
          <span>Technical domains delivered</span>
        </div>
      </div>

      <div class="experience-switch">
        <div>
          <p class="experience-switch__title">Immersive view</p>
          <p class="experience-switch__description">
            Optional 3D enhancement. This portfolio stays fully readable
            without it.
          </p>
        </div>
        <button
          v-if="!immersiveActive"
          class="button button--compact"
          type="button"
          :disabled="immersivePhase === 'loading' || !webGLAvailable"
          @click="emit('requestImmersive')"
        >
          {{
            immersivePhase === 'loading'
              ? 'Loading…'
              : webGLAvailable
                ? 'Enter 3D'
                : '3D unavailable'
          }}
        </button>
        <button
          v-else
          class="button button--compact"
          type="button"
          @click="emit('disableImmersive')"
        >
          Use 2D
        </button>
        <p class="status-message visually-hidden" aria-live="polite">
          {{ immersiveStatus }}
        </p>
      </div>
    </aside>
  </section>
</template>
