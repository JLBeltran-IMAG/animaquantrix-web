import { useEffect, useState } from 'react'
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
      { href: '#talks', label: 'Talks' },
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
      { href: '#talks', label: 'Charlas' },
      { href: '#about', label: 'Sobre Nosotros' },
      { href: '#contact', label: 'Contacto' },
    ],
  },
} as const

function Navbar() {
  const { language, setLanguage } = useLanguage()
  const location = useLocation()
  const content = navContent[language]
  const [menuOpen, setMenuOpen] = useState(false)
  const [visibleSection, setVisibleSection] = useState('top')
  const activeSection = location.pathname === '/' ? visibleSection : getActiveSection(location.pathname)

  useEffect(() => {
    if (location.pathname !== '/') return
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setVisibleSection(entry.target.id === 'hero' ? 'top' : entry.target.id)
      }
    }, { rootMargin: '-10% 0px -55% 0px', threshold: 0 })
    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [location.pathname])

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <SmartLink
          href={getSectionDestination(location.pathname, 'top')}
          className="site-brand"
        >
          <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" width="28" height="28" className="site-brand__logo" />
          {content.brand}
        </SmartLink>

        <button type="button" className="menu-toggle" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? (language === 'en' ? 'Close' : 'Cerrar') : (language === 'en' ? 'Menu' : 'Menú')} <span aria-hidden="true">{menuOpen ? '−' : '+'}</span></button>
        <nav id="primary-navigation" className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label={language === 'en' ? 'Primary' : 'Principal'} onClick={() => setMenuOpen(false)}>
          {content.links.map((link) => (
            <SmartLink
              key={link.href}
              href={location.pathname === '/' ? link.href : getSectionDestination(location.pathname, link.href.slice(1) as TopLevelSection)}
              aria-current={link.href === `#${activeSection}` ? 'location' : undefined}
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
            aria-pressed={language === 'en'}
            onClick={() => setLanguage('en')}
          >
            EN
          </button>
          <button
            type="button"
            className={`language-switcher__button ${
              language === 'es' ? 'is-active' : ''
            }`}
            aria-pressed={language === 'es'}
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
