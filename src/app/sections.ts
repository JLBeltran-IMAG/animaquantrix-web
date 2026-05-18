import type { SectionKey } from '../content/registry'

export type SectionDefinition = {
  key: SectionKey
  id: string
  accentColor: string
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
    accentColor: '#0f766e',
    badge: {
      en: 'Scientific Platform',
      es: 'Plataforma Cientifica',
    },
  },
  research: {
    key: 'research',
    id: 'research',
    accentColor: '#0e7490',
    path: '/research',
    previewLimit: 4,
  },
  about: {
    key: 'about',
    id: 'about',
    accentColor: '#2f855a',
    path: '/about',
  },
  software: {
    key: 'software',
    id: 'software',
    accentColor: '#c05621',
    path: '/software',
    previewLimit: 3,
  },
  talks: {
    key: 'talks',
    id: 'talks',
    accentColor: '#b45309',
    path: '/talks',
    previewLimit: 3,
  },
  contact: {
    key: 'contact',
    id: 'contact',
    accentColor: '#7c3aed',
  },
}

export const HOME_SECTION_ORDER: SectionKey[] = [
  'hero',
  'research',
  'software',
  'talks',
  'contact',
]

export function getSectionDefinition(sectionKey: SectionKey) {
  return SECTION_DEFINITIONS[sectionKey]
}

export function getRoutedSectionDefinitions() {
  return Object.values(SECTION_DEFINITIONS).filter((section) => section.path)
}
