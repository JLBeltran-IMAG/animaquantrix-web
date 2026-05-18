import aboutMarkdown from './about.md?raw'
import contactMarkdown from './contact.md?raw'
import heroMarkdown from './hero.md?raw'
import researchMarkdown from './research.md?raw'
import softwareMarkdown from './software.md?raw'
import talksMarkdown from './talks.md?raw'

export type SectionKey =
  | 'hero'
  | 'research'
  | 'about'
  | 'software'
  | 'talks'
  | 'contact'

const SECTION_MARKDOWN: Record<SectionKey, string> = {
  hero: heroMarkdown,
  research: researchMarkdown,
  about: aboutMarkdown,
  software: softwareMarkdown,
  talks: talksMarkdown,
  contact: contactMarkdown,
}

export function getSectionMarkdown(sectionKey: SectionKey) {
  return SECTION_MARKDOWN[sectionKey]
}
