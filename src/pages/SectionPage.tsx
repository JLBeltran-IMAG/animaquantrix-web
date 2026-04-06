import { useParams } from 'react-router-dom'
import type { SectionKey } from '../content/registry'
import SectionRenderer from '../components/sections/SectionRenderer'

type SectionPageProps = {
  sectionKey: Extract<SectionKey, 'research' | 'software'>
}

function SectionPage({ sectionKey }: SectionPageProps) {
  const { slug } = useParams<{ slug?: string }>()

  return (
    <div className="main-container">
      <SectionRenderer sectionKey={sectionKey} pageSlug={slug} />
    </div>
  )
}

export default SectionPage
