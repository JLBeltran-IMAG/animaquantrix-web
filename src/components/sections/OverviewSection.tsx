import type { CSSProperties } from 'react'
import { useLocation } from 'react-router-dom'
import type { Language } from '../../app/i18n'
import type { SectionItem, SectionMetadata } from '../../lib/content'
import MarkdownContent from '../MarkdownContent'
import SmartLink from '../SmartLink'

type OverviewSectionProps = {
  id: string
  metadata: SectionMetadata
  content: string
  accentColor: string
  language: Language
  sectionPath?: `/${string}`
  previewLimit?: number
  badge?: string
}

const overflowCtaLabel = {
  en: 'See more',
  es: 'Ver mas',
} as const

const defaultItemLinkLabel = {
  en: 'Open',
  es: 'Abrir',
} as const

const githubItemLinkLabel = {
  en: 'View on GitHub',
  es: 'Ver en GitHub',
} as const

const aboutCollectionTitles = {
  collaborators: {
    en: 'Collaborators',
    es: 'Colaboradores',
  },
  students: {
    en: 'Students',
    es: 'Estudiantes',
  },
} as const

function getGitHubRepositoryPreview(href?: string) {
  if (!href) {
    return undefined
  }

  try {
    const url = new URL(href)

    if (url.hostname !== 'github.com') {
      return undefined
    }

    const [owner, rawRepo] = url.pathname.split('/').filter(Boolean)

    if (!owner || !rawRepo) {
      return undefined
    }

    const repo = rawRepo.replace(/\.git$/, '')

    return `https://opengraph.githubassets.com/1/${owner}/${repo}`
  } catch {
    return undefined
  }
}

function getItemImage(item: SectionItem) {
  return getGitHubRepositoryPreview(item.href) ?? item.image
}

function renderItemLink(item: SectionItem, className: string, language: Language) {
  if (!item.href) {
    return null
  }

  const isGitHubLink = Boolean(getGitHubRepositoryPreview(item.href))
  const fallbackLabel = isGitHubLink
    ? githubItemLinkLabel[language]
    : defaultItemLinkLabel[language]

  return (
    <SmartLink href={item.href} className={className}>
      {item.label ?? fallbackLabel}
    </SmartLink>
  )
}

function OverviewSection({
  id,
  metadata,
  content,
  accentColor,
  language,
  sectionPath,
  previewLimit,
  badge,
}: OverviewSectionProps) {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
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
  const fullItemList = activeCollection ? activeCollection.items : metadata.items
  const aboutCollections =
    id === 'about'
      ? [
          {
            key: 'collaborators',
            title: aboutCollectionTitles.collaborators[language],
            items: metadata.collaborators,
          },
          {
            key: 'students',
            title: aboutCollectionTitles.students[language],
            items: metadata.students,
          },
        ].filter((collection) => collection.items.length > 0)
      : []
  const visibleItems =
    isHomePage && previewLimit && fullItemList.length > previewLimit
      ? fullItemList.slice(0, previewLimit)
      : fullItemList
  const hasCollectionSwitching = availableCollections.length > 0
  const shouldShowOverflowCta =
    isHomePage &&
    Boolean(sectionPath) &&
    Boolean(previewLimit) &&
    fullItemList.length > (previewLimit ?? 0) &&
    !metadata.buttons.some((button) => button.href === sectionPath)

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
      {id === 'about' && metadata.image ? (
        <div className="section-content-with-media">
          <MarkdownContent content={content} className="section-content" />
          <img
            src={metadata.image}
            alt={metadata.alt ?? sectionHeading}
            className="section-content-media"
          />
        </div>
      ) : (
        <MarkdownContent content={content} className="section-content" />
      )}

      {aboutCollections.length > 0 ? (
        <>
          {aboutCollections.map((collection) => (
            <div key={collection.key} className="section-collection">
              <h3 className="section-collection-title">{collection.title}</h3>
              <div className="section-items-grid">
                {collection.items.map((item, index) => (
                  <article className="section-item-card" key={`${item.title}-${index}`}>
                    {getItemImage(item) ? (
                      <img
                        src={getItemImage(item)}
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
                      {renderItemLink(item, 'section-item-link', language)}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </>
      ) : visibleItems.length > 0 ? (
        <div className="section-items-grid">
          {visibleItems.map((item, index) => (
            <article className="section-item-card" key={`${item.title}-${index}`}>
              {getItemImage(item) ? (
                <img
                  src={getItemImage(item)}
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
                {renderItemLink(item, 'section-item-link', language)}
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {shouldShowOverflowCta && sectionPath ? (
        <div className="section-overflow-cta">
          <SmartLink href={sectionPath} className="section-button section-button--secondary">
            {overflowCtaLabel[language]}
          </SmartLink>
        </div>
      ) : null}
    </section>
  )
}

export default OverviewSection
