import { getSectionDefinition } from '../../app/sections'
import type { SectionKey } from '../../content/registry'
import { useSectionContent } from '../../hooks/useSectionContent'
import HeroSection from './HeroSection'
import OverviewSection from './OverviewSection'

type SectionRendererProps = {
  sectionKey: SectionKey
}

function SectionRenderer({ sectionKey }: SectionRendererProps) {
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
