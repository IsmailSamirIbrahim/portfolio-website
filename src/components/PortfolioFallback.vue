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

const projects = [
  {
    cover: '/media/projects/immagine/cover.webp',
    coverAlt:
      'A black-and-white input image beside the same connected components rendered in distinct colors.',
    description:
      'A lightweight C++ library for image I/O, transformations, filtering, and segmentation.',
    href: 'https://github.com/IsmailSamirIbrahim/Immagine',
    name: 'Immagine',
    technology: 'C++17 · CMake · stb · Image processing',
  },
  {
    cover: '/media/projects/breakout-game/cover.webp',
    coverAlt:
      'Breakout gameplay with a paddle, ball, multicolored brick rows, and three remaining lives.',
    description: 'A real-time game project exploring rendering and game structure.',
    href: 'https://github.com/IsmailSamirIbrahim/Breakout-Game',
    name: 'Breakout Game',
    technology: 'C++ · Real-time systems · Rendering',
  },
  {
    cover: '/media/projects/thread-pool/cover.webp',
    coverAlt:
      'Diagram showing submitted callables entering a shared task queue and being distributed to three worker threads.',
    description:
      'A compact worker pool with queued callables, condition-variable wakeups, and future-based results.',
    href: 'https://github.com/IsmailSamirIbrahim/Thread-Pool',
    name: 'Thread Pool',
    technology: 'C++ · Threads · Futures · Scheduling',
  },
] as const
</script>

<template>
  <div class="portfolio-shell">
    <a class="skip-link" href="#main-content">Skip to main content</a>

    <header class="site-header">
      <a class="wordmark" href="#top" aria-label="Ismail Samir Ibrahim, home">
        <strong>Ismail Samir Ibrahim</strong>
        <span>Senior C++ Engineer</span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="#projects">Projects</a>
        <a href="#expertise">Expertise</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>

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
              :src="project.cover"
              :alt="project.coverAlt"
              width="1200"
              height="750"
              loading="lazy"
              decoding="async"
            >
            <h3>{{ project.name }}</h3>
            <p>{{ project.description }}</p>
            <small>{{ project.technology }}</small>
            <a :href="project.href">View repository →</a>
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

    <footer>
      <span>© Ismail Samir Ibrahim</span>
      <a href="#top">Back to top ↑</a>
    </footer>
  </div>
</template>
