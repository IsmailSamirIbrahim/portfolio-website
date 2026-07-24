export type FragmentLink = `#${string}`
export type MailLink = `mailto:${string}`
export type WebLink = `https://${string}`
export type InternalPath = `/${string}`
export type LinkTarget = FragmentLink | InternalPath | MailLink | WebLink

export interface NavigationItem {
  label: string
  href: FragmentLink | InternalPath
}

export interface SocialLink {
  label: string
  href: WebLink
}

export interface ContactDetails {
  email: string
  emailHref: MailLink
  social: readonly SocialLink[]
}

export interface Profile {
  name: string
  title: string
  location: string
  headline: string
  biography: string
  availability: string
}

export interface ProjectMedia {
  src: InternalPath
  alt: string
  width: number
  height: number
}

export interface SeoMetadata {
  title: string
  description: string
  canonicalPath: InternalPath
  socialImage: InternalPath
  socialImageAlt: string
}

export interface ProjectCaseStudy {
  overview: string
  problem: string
  role: string
  approach: string
  keyDecisions: readonly string[]
  technologies: readonly string[]
  outcomes: readonly string[]
  limitations: readonly string[]
  callout: string
}

export interface FeaturedProject {
  slug: string
  name: string
  summary: string
  technologySummary: string
  repository: WebLink
  cover: ProjectMedia
  caseStudy: ProjectCaseStudy
  seo: SeoMetadata
}

export interface PortfolioContent {
  profile: Profile
  navigation: {
    primary: readonly NavigationItem[]
    footer: readonly NavigationItem[]
  }
  contact: ContactDetails
  projects: readonly FeaturedProject[]
  seo: {
    siteName: string
    baseUrl: WebLink
    default: SeoMetadata
  }
}
