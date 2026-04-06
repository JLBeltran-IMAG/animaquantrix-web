import type { SectionKey } from '../content/registry'
import SectionRenderer from '../components/sections/SectionRenderer'

type SectionPageProps = {
  sectionKey: Extract<SectionKey, 'research' | 'software' | 'about'>
}

function SectionPage({ sectionKey }: SectionPageProps) {
  return (
    <div className="main-container">
      <SectionRenderer sectionKey={sectionKey} />
    </div>
  )
}

export default SectionPage
