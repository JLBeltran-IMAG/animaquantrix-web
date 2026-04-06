import type { CSSProperties } from 'react'
import type { Language } from '../../app/i18n'
import type { SectionPage } from '../../lib/content'
import MarkdownContent from '../MarkdownContent'
import SmartLink from '../SmartLink'

type SectionSubpageProps = {
  language: Language
  sectionId: 'research' | 'software'
  sectionLabel: string
  accentColor: string
  page?: SectionPage
}

function SectionSubpage({
  language,
  sectionId,
  sectionLabel,
  accentColor,
  page,
}: SectionSubpageProps) {
  const backLabel =
    language === 'es' ? `Volver a ${sectionLabel}` : `Back to ${sectionLabel}`

  if (!page) {
    return (
      <section
        className="subpage-shell"
        style={{ '--accent-color': accentColor } as CSSProperties}
      >
        <div className="subpage-card">
          <SmartLink href={`/#${sectionId}`} className="subpage-backlink">
            {backLabel}
          </SmartLink>
          <h1 className="subpage-title">
            {language === 'es' ? 'Contenido no encontrado' : 'Content not found'}
          </h1>
        </div>
      </section>
    )
  }

  return (
    <section
      className="subpage-shell"
      style={{ '--accent-color': accentColor } as CSSProperties}
    >
      <div className="subpage-card">
        <SmartLink href={`/#${sectionId}`} className="subpage-backlink">
          {backLabel}
        </SmartLink>

        {page.meta ? <p className="subpage-meta">{page.meta}</p> : null}
        <h1 className="subpage-title">{page.title}</h1>
        {page.subtitle ? <p className="subpage-subtitle">{page.subtitle}</p> : null}
        {page.description ? (
          <p className="subpage-summary">{page.description}</p>
        ) : null}

        {page.image ? (
          <div className="subpage-hero-media">
            <img
              src={page.image}
              alt={page.alt ?? page.title}
              className="subpage-hero-image"
            />
          </div>
        ) : null}

        <MarkdownContent content={page.body} className="subpage-content" />
      </div>
    </section>
  )
}

export default SectionSubpage
