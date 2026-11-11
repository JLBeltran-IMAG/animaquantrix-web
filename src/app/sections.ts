import type { SectionKey } from '../content/registry'

export type SectionDefinition = {
  key: SectionKey
  id: string
  path?: `/${string}`
  previewLimit?: number
  badge?: {
    en: string
    es: string
  }
}

export const SECTION_DEFINITIONS: Record<SectionKey, SectionDefinition> = {
  hero: {
    key: 'hero',
    id: 'hero',
    badge: {
      en: 'Scientific Platform',
      es: 'Plataforma Cientifica',
    },
  },
  research: {
    key: 'research',
    id: 'research',
    path: '/research',
    previewLimit: 4,
  },
  about: {
    key: 'about',
    id: 'about',
    path: '/about',
  },
  software: {
    key: 'software',
    id: 'software',
    path: '/software',
    previewLimit: 3,
  },
  talks: {
    key: 'talks',
    id: 'talks',
    path: '/talks',
    previewLimit: 3,
  },
  contact: {
    key: 'contact',
    id: 'contact',
  },
}

export const HOME_SECTION_ORDER: SectionKey[] = [
  'hero',
  'research',
  'software',
  'talks',
  'about',
  'contact',
]

export function getSectionDefinition(sectionKey: SectionKey) {
  return SECTION_DEFINITIONS[sectionKey]
}

export function getRoutedSectionDefinitions() {
  return Object.values(SECTION_DEFINITIONS).filter((section) => section.path)
}
