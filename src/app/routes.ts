export type TopLevelSection = 'top' | 'research' | 'team' | 'software' | 'contact'

export const SECTION_PATHS: Record<TopLevelSection, string> = {
  top: '/#top',
  research: '/research',
  team: '/#team',
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

  if (target === 'top') {
    return '/'
  }

  return SECTION_PATHS[target]
}
