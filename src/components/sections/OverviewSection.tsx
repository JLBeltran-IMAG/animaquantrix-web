import type { CSSProperties } from 'react'
import type { SectionItem, SectionMetadata } from '../../lib/content'
import MarkdownContent from '../MarkdownContent'
import SmartLink from '../SmartLink'

type OverviewSectionProps = {
  id: string
  metadata: SectionMetadata
  content: string
  accentColor: string
  badge?: string
}

function renderItemLink(item: SectionItem, className: string) {
  if (!item.href) {
    return null
  }

  return (
    <SmartLink href={item.href} className={className}>
      {item.label ?? 'Open'}
    </SmartLink>
  )
}

function OverviewSection({
  id,
  metadata,
  content,
  accentColor,
  badge,
}: OverviewSectionProps) {
  const sectionHeading = metadata.title || metadata.subtitle
  const sectionSummary = metadata.title ? metadata.subtitle : ''

  return (
    <section
      id={id}
      className="section-panel"
      style={{ '--accent-color': accentColor } as CSSProperties}
    >
      {badge ? <p className="section-badge">{badge}</p> : null}

      {sectionHeading ? <h2 className="section-title">{sectionHeading}</h2> : null}

      {sectionSummary ? <p className="section-subtitle">{sectionSummary}</p> : null}

      {metadata.buttons.length > 0 ? (
        <div className="section-buttons">
          {metadata.buttons.map((button, index) => (
            <SmartLink
              key={`${button.label}-${button.href}`}
              href={button.href}
              className={`section-button ${
                index === 0 ? 'section-button--primary' : 'section-button--secondary'
              }`}
            >
              {button.label}
            </SmartLink>
          ))}
        </div>
      ) : null}

      <MarkdownContent content={content} className="section-content" />

      {metadata.items.length > 0 ? (
        <div className="section-items-grid">
          {metadata.items.map((item, index) => (
            <article className="section-item-card" key={`${item.title}-${index}`}>
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.alt ?? item.title}
                  className="section-item-image"
                />
              ) : null}

              <div className="section-item-copy">
                {item.meta ? <p className="section-item-meta">{item.meta}</p> : null}
                {item.title ? <h3 className="section-item-title">{item.title}</h3> : null}
                {item.description ? (
                  <p className="section-item-description">{item.description}</p>
                ) : null}
                {renderItemLink(item, 'section-item-link')}
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  )
}

export default OverviewSection
