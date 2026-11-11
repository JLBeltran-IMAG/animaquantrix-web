import type { Language } from '../../app/i18n'
import type { SectionItem } from '../../lib/content'
import SmartLink from '../SmartLink'

type SectionItemCardProps = {
  id: string
  item: SectionItem
  language: Language
  showSoftwareFeatures?: boolean
}

function getGitHubRepositoryPreview(href?: string) {
  if (!href) return undefined

  try {
    const url = new URL(href)
    const [owner, rawRepo] = url.pathname.split('/').filter(Boolean)
    if (url.hostname !== 'github.com' || !owner || !rawRepo) return undefined

    return `https://opengraph.githubassets.com/1/${owner}/${rawRepo.replace(/\.git$/, '')}`
  } catch {
    return undefined
  }
}

function SectionItemCard({ id, item, language, showSoftwareFeatures = false }: SectionItemCardProps) {
  const repositoryPreview = getGitHubRepositoryPreview(item.href)
  const image = item.image ?? repositoryPreview
  const fallbackLabel = repositoryPreview
    ? { en: 'View on GitHub', es: 'Ver en GitHub' }
    : { en: 'Open', es: 'Abrir' }

  return (
    <article className="section-item-card" id={id}>
      {image ? (
        <img src={image} alt={item.alt ?? item.title}
          className="section-item-image" loading="lazy" decoding="async" />
      ) : null}
      <div className="section-item-copy">
        {item.meta ? <p className="section-item-meta">{item.meta}</p> : null}
        {item.title ? <h3 className="section-item-title">{item.title}</h3> : null}
        {item.description ? <p className="section-item-description">{item.description}</p> : null}
        {showSoftwareFeatures ? (
          <ul className="feature-list">
            <li>{language === 'en' ? 'Transport & spin simulations' : 'Simulaciones de transporte y espín'}</li>
            <li>{language === 'en' ? 'Modular experimentation' : 'Experimentación modular'}</li>
            <li>{language === 'en' ? 'Reusable research software' : 'Software científico reutilizable'}</li>
          </ul>
        ) : null}
        {item.href ? (
          <SmartLink href={item.href} className="section-item-link">
            {item.label ?? fallbackLabel[language]}
          </SmartLink>
        ) : null}
      </div>
    </article>
  )
}

export default SectionItemCard
