import type { SectionKey } from '../content/registry'

export type SectionDefinition = {
  key: SectionKey
  id: string
  accentColor: string
  homeVisible: boolean
  supportsSubpages: boolean
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
    homeVisible: true,
    supportsSubpages: false,
    badge: {
      en: 'Scientific Platform',
      es: 'Plataforma Cientifica',
    },
  },
  research: {
    key: 'research',
    id: 'research',
    accentColor: '#0e7490',
    homeVisible: true,
    supportsSubpages: true,
    path: '/research',
  },
  team: {
    key: 'team',
    id: 'team',
    accentColor: '#2f855a',
    homeVisible: true,
    supportsSubpages: false,
  },
  software: {
    key: 'software',
    id: 'software',
    accentColor: '#c05621',
    homeVisible: true,
    supportsSubpages: true,
    path: '/software',
  },
  contact: {
    key: 'contact',
    id: 'contact',
    accentColor: '#7c3aed',
    homeVisible: true,
    supportsSubpages: false,
  },
}

export const HOME_SECTION_ORDER: SectionKey[] = [
  'hero',
  'research',
  'team',
  'software',
  'contact',
]

export function getSectionDefinition(sectionKey: SectionKey) {
  return SECTION_DEFINITIONS[sectionKey]
}

export function getRoutedSectionDefinitions() {
  return Object.values(SECTION_DEFINITIONS).filter((section) => section.path)
}
