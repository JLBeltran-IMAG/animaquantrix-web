import { useLocation } from 'react-router-dom'
import type { Language } from '../../app/i18n'
import type { SectionItem, SectionMetadata } from '../../lib/content'
import MarkdownContent from '../MarkdownContent'
import SmartLink from '../SmartLink'
import SectionButtons from './SectionButtons'
import SectionItemCard from './SectionItemCard'

type OverviewSectionProps = {
  id: string
  metadata: SectionMetadata
  content: string
  language: Language
  sectionPath?: `/${string}`
  previewLimit?: number
  badge?: string
}

const sectionPresentation: Record<string, {
  number: string
  eyebrow: Record<Language, string>
  title?: Record<Language, string>
}> = {
  research: {
    number: '01',
    eyebrow: { en: 'Scientific inquiry', es: 'Investigación científica' },
    title: { en: 'At the frontiers of quantum science.', es: 'En las fronteras de la ciencia cuántica.' },
  },
  software: {
    number: '03',
    eyebrow: { en: 'Scientific software', es: 'Software científico' },
    title: { en: 'Research, translated into code.', es: 'La investigación, traducida en código.' },
  },
  talks: {
    number: '04',
    eyebrow: { en: 'Scientific communication', es: 'Comunicación científica' },
  },
  about: {
    number: '05',
    eyebrow: { en: 'People & purpose', es: 'Personas y propósito' },
    title: { en: 'Science grows through connection.', es: 'La ciencia crece a través de la colaboración.' },
  },
  contact: {
    number: '06',
    eyebrow: { en: 'Start a conversation', es: 'Inicia una conversación' },
  },
}

const overflowCtaLabel = {
  en: 'See more',
  es: 'Ver más',
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

function OverviewSection({
  id,
  metadata,
  content,
  language,
  sectionPath,
  previewLimit,
  badge,
}: OverviewSectionProps) {
  const location = useLocation()
  const presentation = sectionPresentation[id]
  const isHomePage = location.pathname === '/'
  const Heading = isHomePage ? 'h2' : 'h1'
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
    id === 'about' && !isHomePage
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
  const shouldShowOverflowCta =
    isHomePage &&
    Boolean(sectionPath) &&
    Boolean(previewLimit) &&
    fullItemList.length > (previewLimit ?? 0) &&
    !metadata.buttons.some((button) => button.href === sectionPath)

  return (
    <section
      id={id}
      className={`section-panel section-panel--${id}`}
    >
      {badge ? <p className="section-badge">{badge}</p> : null}

      <p className="section-eyebrow">{presentation?.number} / {presentation?.eyebrow[language]}</p>
      <Heading className="section-title">{presentation?.title?.[language] ?? sectionHeading}</Heading>

      {sectionSummary ? <p className="section-subtitle">{sectionSummary}</p> : null}

      <SectionButtons buttons={metadata.buttons} activeCollectionKey={activeCollectionKey} />
      {id === 'about' && metadata.image ? (
        <div className="section-content-with-media">
          <MarkdownContent content={content} className="section-content" />
          <img
            src={metadata.image}
            alt={metadata.alt ?? sectionHeading}
            className="section-content-media" loading="lazy"
          />
        </div>
      ) : (
        <MarkdownContent content={content} className="section-content" />
      )}

      {id === 'about' && isHomePage ? (
        <div className="about-mission">
          <p className="section-eyebrow">{language === 'en' ? 'Collaboration · Open science' : 'Colaboración · Ciencia abierta'}</p>
          <p>{language === 'en'
            ? 'Bringing theoretical inquiry, computational tools, and scientific exchange together. Explore the people and ideas behind Animaquantrix.'
            : 'Conectando preguntas teóricas, herramientas computacionales e intercambio científico. Descubre las personas y las ideas detrás de Animaquantrix.'}</p>
          <SmartLink href="/about" className="section-item-link">{language === 'en' ? 'Meet our collaborators & students' : 'Conoce a nuestros colaboradores y estudiantes'}</SmartLink>
        </div>
      ) : null}

      {aboutCollections.length > 0 ? (
        <>
          {aboutCollections.map((collection) => (
            <div key={collection.key} className="section-collection">
              <h3 className="section-collection-title">{collection.title}</h3>
              <div className="section-items-grid">
                {collection.items.map((item, index) => (
                  <SectionItemCard
                    key={`${item.title}-${index}`}
                    id={`${id}-${collection.key}-${index}`}
                    item={item}
                    language={language}
                  />
                ))}
              </div>
            </div>
          ))}
        </>
      ) : visibleItems.length > 0 ? (
        <div className="section-items-grid" id={activeCollectionKey}>
          {visibleItems.map((item, index) => (
            <SectionItemCard
              key={`${item.title}-${index}`}
              id={`${id}-item-${index}`}
              item={item}
              language={language}
              showSoftwareFeatures={id === 'software'}
            />
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
