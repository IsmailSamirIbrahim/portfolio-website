<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const menuOpen = ref(false)
const menuButton = ref<HTMLButtonElement>()

function closeMenu() {
  menuOpen.value = false
}

async function handleKeydown(event: KeyboardEvent) {
  if (event.key !== 'Escape' || !menuOpen.value) {
    return
  }

  closeMenu()
  await nextTick()
  menuButton.value?.focus()
}

function handleViewportChange(event: MediaQueryListEvent) {
  if (event.matches) {
    closeMenu()
  }
}

let desktopQuery: MediaQueryList | undefined

onMounted(() => {
  desktopQuery = window.matchMedia('(min-width: 840px)')
  desktopQuery.addEventListener('change', handleViewportChange)
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  desktopQuery?.removeEventListener('change', handleViewportChange)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <header class="site-header">
    <a class="wordmark" href="#top" aria-label="Ismail Samir Ibrahim, home">
      <strong>Ismail Samir Ibrahim</strong>
      <span>Senior C++ Engineer</span>
    </a>

    <button
      ref="menuButton"
      class="menu-toggle"
      type="button"
      aria-controls="primary-navigation"
      :aria-expanded="menuOpen"
      @click="menuOpen = !menuOpen"
    >
      {{ menuOpen ? 'Close' : 'Menu' }}
    </button>

    <nav
      id="primary-navigation"
      :class="{ 'primary-navigation--open': menuOpen }"
      aria-label="Primary navigation"
      @click="closeMenu"
    >
      <a href="#projects">Projects</a>
      <a href="#expertise">Expertise</a>
      <a class="primary-navigation__contact" href="#contact">Get in touch</a>
    </nav>
  </header>
</template>
