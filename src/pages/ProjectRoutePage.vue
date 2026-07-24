<script setup lang="ts">
import { computed } from 'vue'

import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { portfolioContent } from '@/content/portfolio'

const props = defineProps<{
  slug: string
}>()

const project = computed(() =>
  portfolioContent.projects.find((item) => item.slug === props.slug),
)
</script>

<template>
  <div v-if="project" class="route-page">
    <SiteHeader />
    <main class="route-page__main">
      <p class="eyebrow">Project case study</p>
      <h1>{{ project.name }}</h1>
      <p class="route-page__summary">{{ project.summary }}</p>
      <RouterLink class="text-link" to="/#projects">
        Back to selected projects
      </RouterLink>
    </main>
    <SiteFooter />
  </div>
</template>
