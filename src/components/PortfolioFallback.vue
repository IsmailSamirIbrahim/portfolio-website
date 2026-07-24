<script setup lang="ts">
import HeroIntroduction from '@/components/HeroIntroduction.vue'
import ProjectShowcase from '@/components/ProjectShowcase.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { portfolioContent } from '@/content/portfolio'
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

const projects = portfolioContent.projects
</script>

<template>
  <div class="portfolio-shell">
    <a class="skip-link" href="#main-content">Skip to main content</a>

    <SiteHeader />

    <main id="main-content">
      <HeroIntroduction
        :immersive-active="immersiveActive"
        :immersive-phase="immersivePhase"
        :immersive-status="immersiveStatus"
        :web-g-l-available="webGLAvailable"
        @disable-immersive="emit('disableImmersive')"
        @request-immersive="emit('requestImmersive')"
      />

      <ProjectShowcase :projects="projects" />

      <section id="expertise" class="content-section">
        <p class="eyebrow">Expertise</p>
        <div class="section-heading">
          <h2>Production thinking from architecture to delivery.</h2>
          <p>
            Modern C++, Qt/QML, multithreading, system architecture, performance
            optimization, testing, CMake, GitHub Actions, Linux, and Windows.
          </p>
        </div>
      </section>

      <section id="contact" class="contact-section">
        <div>
          <p class="eyebrow">Collaboration</p>
          <h2>Let’s build dependable software together.</h2>
        </div>
        <div class="contact-section__actions">
          <a class="button button--primary" href="mailto:ismail.samir.ibrahim@gmail.com">
            Email Ismail
          </a>
          <a class="button" href="https://github.com/IsmailSamirIbrahim">GitHub</a>
          <a class="button" href="https://www.linkedin.com/in/ismailsamiribrahim">
            LinkedIn
          </a>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>
