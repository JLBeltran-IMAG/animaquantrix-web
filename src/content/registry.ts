import contactMarkdown from './contact.md?raw'
import heroMarkdown from './hero.md?raw'
import researchMarkdown from './research.md?raw'
import softwareMarkdown from './software.md?raw'
import teamMarkdown from './team.md?raw'

export type SectionKey = 'hero' | 'research' | 'team' | 'software' | 'contact'

const SECTION_MARKDOWN: Record<SectionKey, string> = {
  hero: heroMarkdown,
  research: researchMarkdown,
  team: teamMarkdown,
  software: softwareMarkdown,
  contact: contactMarkdown,
}

export function getSectionMarkdown(sectionKey: SectionKey) {
  return SECTION_MARKDOWN[sectionKey]
}
