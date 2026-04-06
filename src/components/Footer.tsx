import { useLocation } from 'react-router-dom'
import { useLanguage } from '../app/useLanguage'
import { getSectionDestination, type TopLevelSection } from '../app/routes'
import SmartLink from './SmartLink'

const footerContent = {
  en: {
    brand: 'Animaquantrix',
    description:
      'Scientific platform for quantum transport, computational science, and reproducible software.',
    navigation: 'Navigation',
    sections: [
      { href: '#hero', label: 'Home' },
      { href: '#research', label: 'Research' },
      { href: '#software', label: 'Software' },
      { href: '#about', label: 'About Us' },
      { href: '#contact', label: 'Contact' },
    ],
    resources: 'Resources',
    resourceLinks: [
      { href: '#research', label: 'Publications' },
      { href: '#software', label: 'Repositories' },
      { href: '#software', label: 'Releases' },
    ],
    contact: 'Contact',
    contactLines: [
      'contact@animaquantrix.org',
      'Karlsruhe, Germany',
      'Open to research collaboration',
    ],
    legal: 'All rights reserved.',
  },
  es: {
    brand: 'Animaquantrix',
    description:
      'Plataforma cientifica para transporte cuantico, ciencia computacional y software reproducible.',
    navigation: 'Navegacion',
    sections: [
      { href: '#top', label: 'Inicio' },
      { href: '#research', label: 'Investigacion' },
      { href: '#software', label: 'Software' },
      { href: '#about', label: 'Sobre Nosotros' },
      { href: '#contact', label: 'Contacto' },
    ],
    resources: 'Recursos',
    resourceLinks: [
      { href: '#research', label: 'Publicaciones' },
      { href: '#software', label: 'Repositorios' },
      { href: '#software', label: 'Versiones' },
    ],
    contact: 'Contacto',
    contactLines: [
      'contact@animaquantrix.org',
      'Karlsruhe, Alemania',
      'Abiertos a colaboracion cientifica',
    ],
    legal: 'Todos los derechos reservados.',
  },
} as const

function Footer() {
  const { language } = useLanguage()
  const location = useLocation()
  const content = footerContent[language]

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <section className="site-footer__column site-footer__column--brand">
            <h2 className="site-footer__title site-footer__title--brand">
              {content.brand}
            </h2>
            <p className="site-footer__text">{content.description}</p>
          </section>

          <section className="site-footer__column">
            <h3 className="site-footer__title">{content.navigation}</h3>
            <nav className="site-footer__nav" aria-label={content.navigation}>
              {content.sections.map((link) => (
                <SmartLink
                  key={link.href}
                  href={getSectionDestination(
                    location.pathname,
                    (link.href === '#hero' ? 'top' : link.href.slice(1)) as TopLevelSection,
                  )}
                  className="site-footer__nav-link"
                >
                  {link.label}
                </SmartLink>
              ))}
            </nav>
          </section>

          <section className="site-footer__column">
            <h3 className="site-footer__title">{content.resources}</h3>
            <nav className="site-footer__nav" aria-label={content.resources}>
              {content.resourceLinks.map((link) => (
                <SmartLink
                  key={link.label}
                  href={getSectionDestination(
                    location.pathname,
                    link.href.slice(1) as TopLevelSection,
                  )}
                  className="site-footer__nav-link"
                >
                  {link.label}
                </SmartLink>
              ))}
            </nav>
          </section>

          <section className="site-footer__column">
            <h3 className="site-footer__title">{content.contact}</h3>
            <div className="site-footer__contact">
              {content.contactLines.map((line) => (
                <p key={line} className="site-footer__text">
                  {line}
                </p>
              ))}
            </div>
          </section>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__legal">
            {content.brand} © 2026. {content.legal}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
