import { useLocation } from 'react-router-dom'
import { useLanguage } from '../app/useLanguage'
import {
  getActiveSection,
  getSectionDestination,
  type TopLevelSection,
} from '../app/routes'
import SmartLink from './SmartLink'

const navContent = {
  en: {
    brand: 'Animaquantrix',
    links: [
      { href: '#top', label: 'Home' },
      { href: '#research', label: 'Research' },
      { href: '#software', label: 'Software' },
      { href: '#about', label: 'About Us' },
      { href: '#contact', label: 'Contact' },
    ],
  },
  es: {
    brand: 'Animaquantrix',
    links: [
      { href: '#top', label: 'Inicio' },
      { href: '#research', label: 'Investigacion' },
      { href: '#software', label: 'Software' },
      { href: '#about', label: 'Sobre Nosotros' },
      { href: '#contact', label: 'Contacto' },
    ],
  },
} as const

function Navbar() {
  const { language, setLanguage } = useLanguage()
  const location = useLocation()
  const content = navContent[language]
  const activeSection = getActiveSection(location.pathname)

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <SmartLink
          href={getSectionDestination(location.pathname, 'top')}
          className="site-brand"
        >
          {content.brand}
        </SmartLink>

        <nav className="site-nav" aria-label="Primary">
          {content.links.map((link) => (
            <SmartLink
              key={link.href}
              href={getSectionDestination(
                location.pathname,
                link.href.slice(1) as TopLevelSection,
              )}
              className={`site-nav__link ${
                link.href === `#${activeSection}` ? 'is-active' : ''
              }`}
            >
              {link.label}
            </SmartLink>
          ))}
        </nav>

        <div className="language-switcher" aria-label="Language switcher">
          <button
            type="button"
            className={`language-switcher__button ${
              language === 'en' ? 'is-active' : ''
            }`}
            onClick={() => setLanguage('en')}
          >
            EN
          </button>
          <button
            type="button"
            className={`language-switcher__button ${
              language === 'es' ? 'is-active' : ''
            }`}
            onClick={() => setLanguage('es')}
          >
            ES
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
