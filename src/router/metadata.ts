import type { Router } from 'vue-router'

import { portfolioContent } from '@/content/portfolio'

function ensureMeta(name: string) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[name="${name}"]`,
  )

  if (!element) {
    element = document.createElement('meta')
    element.name = name
    document.head.append(element)
  }

  return element
}

function ensureCanonical() {
  let element =
    document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')

  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    document.head.append(element)
  }

  return element
}

export function installRouteMetadata(router: Router) {
  router.afterEach((route) => {
    const title = String(route.meta.title ?? portfolioContent.seo.default.title)
    const description = String(
      route.meta.description ?? portfolioContent.seo.default.description,
    )
    const canonicalPath = String(
      route.meta.canonicalPath ??
        portfolioContent.seo.default.canonicalPath,
    )

    document.title = title
    ensureMeta('description').content = description
    ensureMeta('robots').content = String(route.meta.robots ?? 'index, follow')
    ensureCanonical().href = new URL(
      canonicalPath,
      portfolioContent.seo.baseUrl,
    ).href
  })
}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    description?: string
    canonicalPath?: string
    robots?: string
  }
}
