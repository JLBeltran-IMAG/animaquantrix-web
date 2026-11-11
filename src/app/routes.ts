export type TopLevelSection =
  | 'top'
  | 'research'
  | 'about'
  | 'software'
  | 'talks'
  | 'contact'

export const SECTION_PATHS: Record<TopLevelSection, string> = {
  top: '/#top',
  research: '/research',
  about: '/about',
  software: '/software',
  talks: '/talks',
  contact: '/#contact',
}

export function getActiveSection(pathname: string): TopLevelSection {
  if (pathname.startsWith('/research')) {
    return 'research'
  }

  if (pathname.startsWith('/software')) {
    return 'software'
  }

  if (pathname.startsWith('/talks')) {
    return 'talks'
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
  if (target === 'top') return '/'

  const destination = SECTION_PATHS[target]
  return target !== 'contact' && pathname.startsWith(destination) ? pathname : destination
}
