import { useLanguage } from '../app/LanguageContext'
import { getSectionContent } from '../lib/content'
import type { SectionKey } from '../content/registry'

export function useSectionContent(sectionKey: SectionKey) {
  const { language } = useLanguage()

  return {
    language,
    ...getSectionContent(sectionKey, language),
  }
}
