<script setup lang="ts">
defineProps<{
  title: string
  summary: string
}>()
</script>

<template>
  <div class="route-page">
    <main class="route-page__main">
      <RouterLink class="wordmark route-page__wordmark" to="/">
        <strong>Ismail Samir Ibrahim</strong>
        <span>Senior C++ Engineer</span>
      </RouterLink>
      <p class="eyebrow">Portfolio information</p>
      <h1>{{ title }}</h1>
      <p class="route-page__summary">{{ summary }}</p>
      <RouterLink class="text-link" to="/">Return home</RouterLink>
    </main>
  </div>
</template>
