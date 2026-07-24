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
    <RouterLink
      class="wordmark"
      to="/#top"
      aria-label="Ismail Samir Ibrahim, home"
    >
      <strong>Ismail Samir Ibrahim</strong>
      <span>Senior C++ Engineer</span>
    </RouterLink>

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
      <RouterLink to="/#projects">Projects</RouterLink>
      <RouterLink to="/#expertise">Expertise</RouterLink>
      <RouterLink class="primary-navigation__contact" to="/#contact">
        Get in touch
      </RouterLink>
    </nav>
  </header>
</template>
