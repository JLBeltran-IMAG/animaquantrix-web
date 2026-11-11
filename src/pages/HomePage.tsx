import { PillarsSection, SimulationsSection } from '../components/sections/DiscoverySections'
import { HOME_SECTION_ORDER } from '../app/sections'
import SectionRenderer from '../components/sections/SectionRenderer'

function HomePage() {
  return (
    <div className="main-container">
      {HOME_SECTION_ORDER.map((sectionKey, index) => (
        <div key={sectionKey}>
          <SectionRenderer sectionKey={sectionKey} />
          {index === 0 ? <PillarsSection /> : null}
          {sectionKey === 'research' ? <SimulationsSection /> : null}
        </div>
      ))}
    </div>
  )
}

export default HomePage
