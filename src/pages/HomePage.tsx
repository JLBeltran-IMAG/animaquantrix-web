import ScanDivider from '../components/ScanDivider'
import { HOME_SECTION_ORDER } from '../app/sections'
import SectionRenderer from '../components/sections/SectionRenderer'

function HomePage() {
  return (
    <div className="main-container">
      {HOME_SECTION_ORDER.map((sectionKey, index) => (
        <div key={sectionKey}>
          <SectionRenderer sectionKey={sectionKey} />
          {index < HOME_SECTION_ORDER.length - 1 ? <ScanDivider /> : null}
        </div>
      ))}
    </div>
  )
}

export default HomePage
