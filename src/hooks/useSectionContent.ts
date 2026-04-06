import { useLanguage } from '../app/useLanguage'
import { getSectionContent } from '../lib/content'
import type { SectionKey } from '../content/registry'

export function useSectionContent(sectionKey: SectionKey) {
  const { language } = useLanguage()

  return {
    language,
    ...getSectionContent(sectionKey, language),
  }
}
