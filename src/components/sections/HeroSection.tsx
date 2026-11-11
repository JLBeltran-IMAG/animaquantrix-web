import { useEffect, useState } from 'react'
import { useLanguage } from '../../app/useLanguage'
import type { SectionItem, SectionMetadata } from '../../lib/content'
import MarkdownContent from '../MarkdownContent'
import SmartLink from '../SmartLink'

type HeroSectionProps = {
  id: string
  metadata: SectionMetadata
  content: string
  badge?: string
}

function getSlideLabel(slide: SectionItem, index: number) {
  return slide.title || slide.meta || `Slide ${index + 1}`
}

function HeroSection({
  id,
  metadata,
  content,
  badge,
}: HeroSectionProps) {
  const slides = metadata.slides
  const [activeSlide, setActiveSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [hasFocus, setHasFocus] = useState(false)
  const { language } = useLanguage()
  const normalizedActiveSlide = slides.length > 0 ? activeSlide % slides.length : -1
  const currentSlide = slides[normalizedActiveSlide]
  const heroHasTitle = Boolean(metadata.title)
  const heroSlidesLabel = metadata.title || currentSlide?.title || id

  useEffect(() => {
    if (slides.length < 2 || isHovered || hasFocus) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let timer: number | undefined

    function scheduleNextSlide() {
      window.clearTimeout(timer)
      if (reducedMotion.matches || document.hidden) return

      timer = window.setTimeout(() => {
        setActiveSlide((current) => (current + 1) % slides.length)
      }, 5000)
    }

    scheduleNextSlide()
    reducedMotion.addEventListener('change', scheduleNextSlide)
    document.addEventListener('visibilitychange', scheduleNextSlide)

    return () => {
      window.clearTimeout(timer)
      reducedMotion.removeEventListener('change', scheduleNextSlide)
      document.removeEventListener('visibilitychange', scheduleNextSlide)
    }
  }, [activeSlide, slides.length, isHovered, hasFocus])

  return (
    <section
      id={id}
      className="section-panel section-panel--hero"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setHasFocus(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false)
      }}
    >
      <div className="section-hero-grid">
        <div className="section-hero-copy">
          {badge ? <p className="section-badge">{badge}</p> : null}

          {heroHasTitle ? (
            <h1 className="section-title section-title--hero">{metadata.title}</h1>
          ) : null}

          {currentSlide ? (
            <div className="hero-copy-active">
              {currentSlide.meta ? (
                <p className="hero-slide-meta">{currentSlide.meta}</p>
              ) : null}
              {currentSlide.title ? (
                <h1 className="hero-copy-title">{currentSlide.title}</h1>
              ) : null}
              {currentSlide.description ? (
                <p className="hero-copy-description">{currentSlide.description}</p>
              ) : null}
              {currentSlide.href ? (
                <SmartLink href={currentSlide.href} className="hero-slide-link">
                  {currentSlide.label ?? 'Open'}
                </SmartLink>
              ) : null}
            </div>
          ) : (
            <MarkdownContent content={content} className="section-content section-content--hero" />
          )}

        </div>

        {currentSlide ? (
          <div className="hero-visual">
            <div className={`hero-visual-frame ${normalizedActiveSlide === 0 ? 'hero-visual-frame--diagram' : ''}`}>
              {currentSlide.image ? (
                <img
                  src={currentSlide.image}
                  alt={currentSlide.alt ?? currentSlide.title}
                  className="hero-visual-image"
                />
              ) : (
                <div className="hero-visual-placeholder" />
              )}

              <p className="visual-caption">
                <span>ANIMAQUANTRIX /</span> {currentSlide.meta}
              </p>

              {slides.length > 1 ? (
                <>
                  <button
                    type="button"
                    className="hero-arrow hero-arrow--previous"
                    onClick={() =>
                      setActiveSlide(
                        (current) => (current - 1 + slides.length) % slides.length,
                      )
                    }
                    aria-label={language === 'en' ? 'Previous slide' : 'Diapositiva anterior'}
                  >
                    <span aria-hidden="true">‹</span>
                  </button>
                  <button
                    type="button"
                    className="hero-arrow hero-arrow--next"
                    onClick={() =>
                      setActiveSlide((current) => (current + 1) % slides.length)
                    }
                    aria-label={language === 'en' ? 'Next slide' : 'Diapositiva siguiente'}
                  >
                    <span aria-hidden="true">›</span>
                  </button>
                </>
              ) : null}
            </div>

            {slides.length > 1 ? (
              <div
                className="hero-slide-nav"
                role="group"
                aria-label={`${heroSlidesLabel} — ${language === 'en' ? 'Choose a slide' : 'Elegir diapositiva'}`}
              >
                {slides.map((slide, index) => (
                  <button
                    key={`${slide.title}-${index}`}
                    type="button"
                    className={`hero-slide-trigger ${
                      index === normalizedActiveSlide ? 'is-active' : ''
                    }`}
                    onClick={() => setActiveSlide(index)}
                    aria-pressed={index === normalizedActiveSlide}
                    aria-label={getSlideLabel(slide, index)}
                  >
                    <span className="hero-slide-trigger-dot">{String(index + 1).padStart(2, '0')}</span>
                    <span>{slide.meta}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default HeroSection
