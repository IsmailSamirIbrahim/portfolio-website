import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import { portfolioContent } from '@/content/portfolio'
import { installRouteMetadata } from '@/router/metadata'

const projectRoutes: RouteRecordRaw[] = portfolioContent.projects.map(
  (project) => ({
    path: project.seo.canonicalPath,
    name: `project-${project.slug}`,
    component: () => import('@/pages/ProjectRoutePage.vue'),
    props: { slug: project.slug },
    meta: project.seo,
  }),
)

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
    meta: portfolioContent.seo.default,
  },
  ...projectRoutes,
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('@/pages/LegalRoutePage.vue'),
    props: {
      title: 'Privacy',
      summary:
        'How this portfolio handles contact links, preferences, and visitor information.',
    },
    meta: {
      title: 'Privacy — Ismail Samir Ibrahim',
      description:
        'Privacy information for Ismail Samir Ibrahim’s engineering portfolio.',
      canonicalPath: '/privacy',
    },
  },
  {
    path: '/legal',
    name: 'legal',
    component: () => import('@/pages/LegalRoutePage.vue'),
    props: {
      title: 'Legal information',
      summary:
        'Ownership, responsible use, and external-link information for this portfolio.',
    },
    meta: {
      title: 'Legal Information — Ismail Samir Ibrahim',
      description:
        'Legal information for Ismail Samir Ibrahim’s engineering portfolio.',
      canonicalPath: '/legal',
    },
  },
  {
    path: '/credits',
    name: 'credits',
    component: () => import('@/pages/LegalRoutePage.vue'),
    props: {
      title: 'Credits',
      summary:
        'Project media, libraries, typefaces, and tools used to create this portfolio.',
    },
    meta: {
      title: 'Credits — Ismail Samir Ibrahim',
      description:
        'Credits and attributions for Ismail Samir Ibrahim’s engineering portfolio.',
      canonicalPath: '/credits',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: {
      title: 'Page Not Found — Ismail Samir Ibrahim',
      description: 'The requested portfolio page could not be found.',
      canonicalPath: '/',
      robots: 'noindex, nofollow',
    },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }

    return { top: 0 }
  },
})

installRouteMetadata(router)
