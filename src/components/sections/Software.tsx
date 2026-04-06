import SectionRenderer from './SectionRenderer'

type SoftwareProps = {
  pageSlug?: string
}

function Software({ pageSlug }: SoftwareProps) {
  return <SectionRenderer sectionKey="software" pageSlug={pageSlug} />
}

export default Software
