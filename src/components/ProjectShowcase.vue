<script setup lang="ts">
import type { FeaturedProject } from '@/types/content'

defineProps<{
  projects: readonly FeaturedProject[]
}>()
</script>

<template>
  <section id="projects" class="project-showcase" aria-labelledby="projects-title">
    <div class="project-showcase__introduction">
      <div>
        <p class="eyebrow">Selected projects</p>
        <h2 id="projects-title">Engineering,<br>explored in depth.</h2>
      </div>
      <p>
        Three focused builds across image processing, real-time rendering, and
        concurrent systems. Each one turns a low-level engineering problem into
        a clear, reusable solution.
      </p>
    </div>

    <ol class="project-showcase__grid">
      <li
        v-for="(project, index) in projects"
        :key="project.slug"
        class="project-showcase__item"
      >
        <article class="project-card">
          <a
            class="project-card__link"
            :href="project.repository"
            :aria-label="`View ${project.name} repository on GitHub`"
          >
            <div class="project-card__media-frame">
              <img
                class="project-card__media"
                :src="project.cover.src"
                :alt="project.cover.alt"
                :width="project.cover.width"
                :height="project.cover.height"
                loading="lazy"
                decoding="async"
              >
              <span class="project-card__index" aria-hidden="true">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
              <span class="project-card__action" aria-hidden="true">
                Explore
                <span>↗</span>
              </span>
            </div>

            <div class="project-card__body">
              <div>
                <p class="project-card__discipline">
                  {{ project.technologySummary }}
                </p>
                <h3>{{ project.name }}</h3>
              </div>
              <p class="project-card__summary">{{ project.summary }}</p>
            </div>
          </a>
        </article>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.project-showcase {
  width: min(100%, 1240px);
  margin-inline: auto;
  padding: 84px var(--space-outer) 96px;
  border-top: var(--stroke-sm) solid var(--color-border);
}

.project-showcase__introduction {
  display: grid;
  gap: var(--space-lg);
  margin-bottom: clamp(40px, 7vw, 76px);
}

.project-showcase__introduction h2 {
  max-width: 760px;
  margin: 0;
  font-size: clamp(42px, 8vw, 76px);
  letter-spacing: -0.055em;
  line-height: 0.88;
}

.project-showcase__introduction > p {
  max-width: 520px;
  margin: 0;
  color: var(--color-text-muted);
  font-size: clamp(16px, 2vw, 19px);
  line-height: 1.55;
}

.project-showcase__grid {
  display: grid;
  gap: clamp(38px, 7vw, 84px);
  margin: 0;
  padding: 0;
  list-style: none;
}

.project-showcase__item {
  min-width: 0;
}

.project-card,
.project-card__link {
  display: block;
  min-width: 0;
}

.project-card__link {
  color: inherit;
  border-radius: clamp(18px, 3vw, 30px);
  text-decoration: none;
  touch-action: manipulation;
}

.project-card__media-frame {
  position: relative;
  overflow: hidden;
  aspect-ratio: 8 / 5;
  background: var(--color-dark-blue-500);
  border: var(--stroke-sm) solid var(--color-border);
  border-radius: clamp(18px, 3vw, 30px);
  box-shadow: 0 18px 48px rgba(45, 42, 36, 0.09);
  isolation: isolate;
}

.project-card__media-frame::after {
  position: absolute;
  z-index: 1;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(5, 46, 135, 0.02) 45%,
    rgba(5, 46, 135, 0.56) 100%
  );
  content: "";
  pointer-events: none;
}

.project-card__media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 600ms var(--ease-smooth);
}

.project-card__index,
.project-card__action {
  position: absolute;
  z-index: 2;
  color: var(--color-white-400);
  font-size: var(--font-size-xxs);
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.project-card__index {
  top: var(--space-sm);
  left: var(--space-sm);
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  background: rgba(5, 46, 135, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.42);
  border-radius: 50%;
  backdrop-filter: blur(8px);
}

.project-card__action {
  right: var(--space-sm);
  bottom: var(--space-sm);
  display: flex;
  min-height: 44px;
  align-items: center;
  gap: var(--space-xs);
  padding: 10px 14px;
  color: var(--color-text);
  background: var(--color-action);
  border: 1px solid rgba(45, 42, 36, 0.35);
  border-radius: 999px;
  transition:
    color 180ms var(--ease-smooth),
    background-color 180ms var(--ease-smooth),
    transform 180ms var(--ease-smooth);
}

.project-card__action span {
  font-size: 16px;
  line-height: 1;
}

.project-card__body {
  display: grid;
  gap: var(--space-md);
  padding-top: var(--space-md);
}

.project-card__discipline {
  margin: 0 0 5px;
  color: var(--color-dark-blue-500);
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.08em;
  line-height: 1.35;
  text-transform: uppercase;
}

.project-card h3 {
  margin: 0;
  font-size: clamp(28px, 5vw, 48px);
  line-height: 0.98;
}

.project-card__summary {
  max-width: 480px;
  min-height: 0;
  margin: 0;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.project-card__link:hover .project-card__media,
.project-card__link:focus-visible .project-card__media {
  transform: scale(1.035);
}

.project-card__link:hover .project-card__action,
.project-card__link:focus-visible .project-card__action {
  color: var(--color-white-400);
  background: var(--color-dark-blue-500);
  transform: translateY(-3px);
}

.project-card__link:active .project-card__media {
  transform: scale(1.015);
}

.project-card__link:active .project-card__action {
  transform: translateY(0);
}

@media (min-width: 600px) {
  .project-card__body {
    grid-template-columns: minmax(0, 1fr) minmax(230px, 0.72fr);
    align-items: start;
    gap: var(--space-xl);
  }
}

@media (min-width: 840px) {
  .project-showcase__introduction {
    grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
    align-items: end;
  }

  .project-showcase__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: start;
    column-gap: clamp(22px, 3vw, 38px);
  }

  .project-showcase__item:first-child {
    grid-column: 1 / -1;
  }

  .project-showcase__item:first-child .project-card__media-frame {
    aspect-ratio: 16 / 7;
  }

  .project-showcase__item:not(:first-child) .project-card__body {
    grid-template-columns: 1fr;
    gap: var(--space-sm);
  }

  .project-showcase__item:not(:first-child) .project-card h3 {
    font-size: clamp(32px, 4vw, 44px);
  }
}

@media (hover: none) {
  .project-card__action {
    color: var(--color-white-400);
    background: var(--color-dark-blue-500);
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-card__media,
  .project-card__action {
    transition: none;
  }
}
</style>
