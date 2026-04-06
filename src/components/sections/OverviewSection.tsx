import type { CSSProperties } from 'react'
import { useLocation } from 'react-router-dom'
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
  const location = useLocation()
  const sectionHeading = metadata.title || metadata.subtitle
  const sectionSummary = metadata.title ? metadata.subtitle : ''
  const availableCollections: Array<{ key: string; items: SectionItem[] }> = [
    { key: 'topics', items: metadata.topics },
    { key: 'publications', items: metadata.publications },
  ].filter((collection) => collection.items.length > 0 || location.hash === `#${collection.key}`)
  const activeCollectionKey =
    location.hash && availableCollections.some((entry) => `#${entry.key}` === location.hash)
      ? location.hash.slice(1)
      : availableCollections[0]?.key
  const activeCollection = availableCollections.find(
    (collection) => collection.key === activeCollectionKey,
  )
  const visibleItems = activeCollection ? activeCollection.items : metadata.items
  const hasCollectionSwitching = availableCollections.length > 0

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
                hasCollectionSwitching
                  ? button.href.endsWith(`#${activeCollectionKey}`)
                    ? 'section-button--active'
                    : 'section-button--neutral'
                  : index === 0
                    ? 'section-button--primary'
                    : 'section-button--secondary'
              }`}
            >
              {button.label}
            </SmartLink>
          ))}
        </div>
      ) : null}

      <MarkdownContent content={content} className="section-content" />

      {visibleItems.length > 0 ? (
        <div className="section-items-grid">
          {visibleItems.map((item, index) => (
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
