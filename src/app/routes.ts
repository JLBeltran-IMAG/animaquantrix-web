export type TopLevelSection = 'top' | 'research' | 'about' | 'software' | 'contact'

export const SECTION_PATHS: Record<TopLevelSection, string> = {
  top: '/#top',
  research: '/research',
  about: '/about',
  software: '/software',
  contact: '/#contact',
}

export function getActiveSection(pathname: string): TopLevelSection {
  if (pathname.startsWith('/research')) {
    return 'research'
  }

  if (pathname.startsWith('/software')) {
    return 'software'
  }

  if (pathname.startsWith('/about')) {
    return 'about'
  }

  return 'top'
}

export function getSectionDestination(
  pathname: string,
  target: TopLevelSection,
): string {
  if (target === 'research') {
    return pathname.startsWith('/research') ? pathname : '/research'
  }

  if (target === 'software') {
    return pathname.startsWith('/software') ? pathname : '/software'
  }

  if (target === 'about') {
    return pathname.startsWith('/about') ? pathname : '/about'
  }

  if (target === 'top') {
    return '/'
  }

  return SECTION_PATHS[target]
}
