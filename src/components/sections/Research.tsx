import SectionRenderer from './SectionRenderer'

type ResearchProps = {
  pageSlug?: string
}

function Research({ pageSlug }: ResearchProps) {
  return <SectionRenderer sectionKey="research" pageSlug={pageSlug} />
}

export default Research
