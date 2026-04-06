import { getSectionDefinition } from '../../app/sections'
import type { SectionKey } from '../../content/registry'
import { useSectionContent } from '../../hooks/useSectionContent'
import HeroSection from './HeroSection'
import OverviewSection from './OverviewSection'
import SectionSubpage from './SectionSubpage'

type SectionRendererProps = {
  sectionKey: SectionKey
  pageSlug?: string
}

function SectionRenderer({ sectionKey, pageSlug }: SectionRendererProps) {
  const definition = getSectionDefinition(sectionKey)
  const { language, metadata, content } = useSectionContent(sectionKey)

  if (sectionKey === 'hero') {
    return (
      <HeroSection
        id={definition.id}
        metadata={metadata}
        content={content}
        accentColor={definition.accentColor}
        badge={definition.badge?.[language]}
      />
    )
  }

  if (pageSlug && definition.supportsSubpages) {
    const page = metadata.pages.find((entry) => entry.slug === pageSlug)

    return (
      <SectionSubpage
        language={language}
        sectionId={definition.id as 'research' | 'software'}
        sectionLabel={metadata.subtitle}
        accentColor={definition.accentColor}
        page={page}
      />
    )
  }

  return (
    <OverviewSection
      id={definition.id}
      metadata={metadata}
      content={content}
      accentColor={definition.accentColor}
    />
  )
}

export default SectionRenderer
