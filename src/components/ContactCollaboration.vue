<script setup lang="ts">
import { portfolioContent } from '@/content/portfolio'

const { contact, profile } = portfolioContent
</script>

<template>
  <section
    id="contact"
    class="contact-collaboration"
    aria-labelledby="contact-heading"
  >
    <div class="contact-collaboration__intro">
      <p class="eyebrow">Collaboration</p>
      <h2 id="contact-heading">
        Let’s build dependable software together.
      </h2>
      <p class="contact-collaboration__availability">
        {{ profile.availability }}
      </p>
    </div>

    <div class="contact-collaboration__card">
      <div class="contact-collaboration__status">
        <span aria-hidden="true"></span>
        <p>
          <strong>Available for conversations</strong>
          <small>{{ profile.location }} · Remote-friendly</small>
        </p>
      </div>

      <a
        class="contact-collaboration__email"
        :href="contact.emailHref"
        :aria-label="`Email ${profile.name} at ${contact.email}`"
      >
        <span>Start a conversation</span>
        <strong>{{ contact.email }}</strong>
        <span class="contact-collaboration__arrow" aria-hidden="true">↗</span>
      </a>

      <nav
        class="contact-collaboration__links"
        aria-label="Résumé and professional profiles"
      >
        <a :href="contact.resume.href">
          {{ contact.resume.label }}
          <span aria-hidden="true">↑</span>
        </a>
        <a
          v-for="social in contact.social"
          :key="social.label"
          :href="social.href"
          target="_blank"
          rel="noreferrer"
        >
          {{ social.label }}
          <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </div>
  </section>
</template>

<style scoped>
.contact-collaboration {
  width: min(100%, 1240px);
  min-height: 520px;
  margin-inline: auto;
  padding: 70px var(--space-outer);
  display: grid;
  gap: var(--space-xl);
  align-content: center;
  border-top: var(--stroke-sm) solid var(--color-border);
}

.contact-collaboration__intro {
  min-width: 0;
}

.contact-collaboration h2 {
  max-width: 760px;
  margin-bottom: var(--space-lg);
  font-size: clamp(40px, 8vw, 72px);
  line-height: 0.94;
}

.contact-collaboration__availability {
  max-width: 660px;
  margin-bottom: 0;
  color: var(--color-text-muted);
  font-size: clamp(var(--font-size-md), 2vw, var(--font-size-lg));
  line-height: 1.55;
}

.contact-collaboration__card {
  min-width: 0;
  padding: var(--space-sm);
  background: var(--color-dark-blue-500);
  border: var(--stroke-sm) solid rgba(255, 255, 255, 0.16);
  border-radius: var(--radius-xl);
  box-shadow: 0 24px 56px rgba(5, 46, 135, 0.16);
}

.contact-collaboration__status {
  display: flex;
  gap: var(--space-sm);
  align-items: center;
  padding: var(--space-xs) var(--space-xs) var(--space-md);
  color: var(--color-text-cyan-400);
}

.contact-collaboration__status > span {
  width: 10px;
  height: 10px;
  flex: 0 0 auto;
  background: var(--color-orange-400);
  border: 3px solid rgba(255, 132, 0, 0.28);
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(255, 132, 0, 0.16);
}

.contact-collaboration__status p {
  display: grid;
  gap: 2px;
  margin: 0;
}

.contact-collaboration__status strong {
  font-size: var(--font-size-xs);
  letter-spacing: 0.03em;
}

.contact-collaboration__status small {
  color: var(--color-text-cyan-300);
  font-size: 10px;
}

.contact-collaboration__email {
  position: relative;
  display: grid;
  gap: var(--space-xs);
  min-width: 0;
  padding: var(--space-lg) var(--space-md);
  color: var(--color-action-text);
  background: var(--color-orange-400);
  border-radius: var(--radius-lg);
  text-decoration: none;
  transition: transform 180ms var(--ease-smooth);
}

.contact-collaboration__email:hover {
  transform: translateY(-2px);
}

.contact-collaboration__email > span:first-child {
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.contact-collaboration__email strong {
  min-width: 0;
  padding-right: var(--space-xl);
  font-size: clamp(15px, 3.7vw, 23px);
  letter-spacing: -0.03em;
  overflow-wrap: anywhere;
}

.contact-collaboration__arrow {
  position: absolute;
  top: var(--space-md);
  right: var(--space-md);
  font-size: var(--font-size-title-xs);
  font-weight: 900;
}

.contact-collaboration__links {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-xs);
  padding-top: var(--space-sm);
}

.contact-collaboration__links a {
  display: flex;
  min-height: 48px;
  align-items: center;
  justify-content: space-between;
  padding-inline: var(--space-sm);
  color: var(--color-text-cyan-400);
  border: var(--stroke-sm) solid rgba(129, 189, 216, 0.35);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  font-weight: 800;
  text-decoration: none;
  transition:
    color 180ms var(--ease-smooth),
    background-color 180ms var(--ease-smooth);
}

.contact-collaboration__links a:hover {
  color: var(--color-dark-blue-500);
  background: var(--color-text-cyan-400);
}

@media (min-width: 840px) {
  .contact-collaboration {
    grid-template-columns: minmax(0, 1.16fr) minmax(390px, 0.84fr);
    gap: 70px;
    align-items: center;
  }

  .contact-collaboration__links {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
