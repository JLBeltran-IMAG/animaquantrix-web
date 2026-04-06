import type { SectionKey } from '../content/registry'

export type SectionDefinition = {
  key: SectionKey
  id: string
  accentColor: string
  path?: `/${string}`
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
  'contact',
]

export function getSectionDefinition(sectionKey: SectionKey) {
  return SECTION_DEFINITIONS[sectionKey]
}

export function getRoutedSectionDefinitions() {
  return Object.values(SECTION_DEFINITIONS).filter((section) => section.path)
}
