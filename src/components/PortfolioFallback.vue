<script setup lang="ts">
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
      <section id="top" class="hero">
        <div class="hero__copy">
          <p class="eyebrow">Cairo, Egypt · Open to opportunities</p>
          <h1>Building high-performance software where precision matters.</h1>
          <p class="hero__lede">
            I’m Ismail, a Senior C++ Software Engineer with 8+ years of
            experience building production software across dental AI, medical
            imaging, and Arabic NLP.
          </p>
          <div class="action-row">
            <a class="button button--primary" href="#projects">Explore my work</a>
            <a class="button" href="mailto:ismail.samir.ibrahim@gmail.com">
              Get in touch
            </a>
          </div>
        </div>

        <aside class="experience-switch" aria-labelledby="experience-switch-title">
          <p id="experience-switch-title" class="experience-switch__title">
            Optional immersive layer
          </p>
          <p>
            The complete portfolio is always available as accessible HTML. The
            future 3D room loads only when requested and supported.
          </p>
          <button
            v-if="!immersiveActive"
            class="button button--compact"
            type="button"
            :disabled="immersivePhase === 'loading'"
            @click="emit('requestImmersive')"
          >
            {{
              immersivePhase === 'loading'
                ? 'Loading…'
                : webGLAvailable
                  ? 'Preview immersive layer'
                  : '3D unavailable'
            }}
          </button>
          <button
            v-else
            class="button button--compact"
            type="button"
            @click="emit('disableImmersive')"
          >
            Use 2D only
          </button>
          <p class="status-message" aria-live="polite">
            {{ immersiveStatus }}
          </p>
        </aside>
      </section>

      <section id="projects" class="content-section">
        <p class="eyebrow">Selected projects</p>
        <div class="section-heading">
          <h2>Engineering, explored in depth.</h2>
          <p>
            Three focused projects introduce the problem, implementation choices,
            and source code without requiring WebGL.
          </p>
        </div>
        <div class="project-grid">
          <article v-for="project in projects" :key="project.name" class="project-card">
            <img
              class="project-card__media"
              :src="project.cover.src"
              :alt="project.cover.alt"
              :width="project.cover.width"
              :height="project.cover.height"
              loading="lazy"
              decoding="async"
            >
            <h3>{{ project.name }}</h3>
            <p>{{ project.summary }}</p>
            <small>{{ project.technologySummary }}</small>
            <a :href="project.repository">View repository →</a>
          </article>
        </div>
      </section>

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
