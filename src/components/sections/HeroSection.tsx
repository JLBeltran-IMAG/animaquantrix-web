import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'
import type { SectionItem, SectionMetadata } from '../../lib/content'
import MarkdownContent from '../MarkdownContent'
import SmartLink from '../SmartLink'

type HeroSectionProps = {
  id: string
  metadata: SectionMetadata
  content: string
  accentColor: string
  badge?: string
}

function getSlideLabel(slide: SectionItem, index: number) {
  return slide.title || slide.meta || `Slide ${index + 1}`
}

function HeroSection({
  id,
  metadata,
  content,
  accentColor,
  badge,
}: HeroSectionProps) {
  const slides = metadata.slides ?? []
  const [activeSlide, setActiveSlide] = useState(() =>
    slides.length > 0 ? 0 : -1,
  )

  useEffect(() => {
    if (slides.length <= 1) {
      return
    }

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [slides.length])
  const normalizedActiveSlide =
    slides.length > 0
      ? activeSlide >= 0
        ? activeSlide % slides.length
        : 0
      : -1
  const currentSlide =
    normalizedActiveSlide >= 0 ? slides[normalizedActiveSlide] : undefined
  const heroIntro = metadata.subtitle
  const heroHasTitle = Boolean(metadata.title)
  const heroSlidesLabel = metadata.title || metadata.subtitle || id

  return (
    <section
      id={id}
      className="section-panel section-panel--hero"
      style={{ '--accent-color': accentColor } as CSSProperties}
    >
      <div className="section-hero-grid">
        <div className="section-hero-copy">
          {badge ? <p className="section-badge">{badge}</p> : null}

          {heroHasTitle ? (
            <h1 className="section-title section-title--hero">{metadata.title}</h1>
          ) : null}

          {heroIntro ? (
            <p
              className={`section-subtitle section-subtitle--hero ${
                heroHasTitle ? '' : 'section-subtitle--hero-leading'
              }`}
            >
              {heroIntro}
            </p>
          ) : null}

          {currentSlide ? (
            <div className="hero-copy-active">
              {currentSlide.meta ? (
                <p className="hero-slide-meta">{currentSlide.meta}</p>
              ) : null}
              {currentSlide.title ? (
                <h2 className="hero-copy-title">{currentSlide.title}</h2>
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

          {metadata.buttons.length > 0 ? (
            <div className="section-buttons">
              {metadata.buttons.map((button, index) => (
                <SmartLink
                  key={`${button.label}-${button.href}`}
                  href={button.href}
                  className={`section-button ${
                    index === 0
                      ? 'section-button--primary'
                      : 'section-button--secondary'
                  }`}
                >
                  {button.label}
                </SmartLink>
              ))}
            </div>
          ) : null}
        </div>

        {currentSlide ? (
          <div className="hero-visual">
            <div className="hero-visual-frame">
              {currentSlide.image ? (
                <img
                  src={currentSlide.image}
                  alt={currentSlide.alt ?? currentSlide.title}
                  className="hero-visual-image"
                />
              ) : (
                <div className="hero-visual-placeholder" />
              )}

              <div className="hero-visual-overlay" />

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
                    aria-label="Previous slide"
                  >
                    <span aria-hidden="true">‹</span>
                  </button>
                  <button
                    type="button"
                    className="hero-arrow hero-arrow--next"
                    onClick={() =>
                      setActiveSlide((current) => (current + 1) % slides.length)
                    }
                    aria-label="Next slide"
                  >
                    <span aria-hidden="true">›</span>
                  </button>
                </>
              ) : null}
            </div>

            {slides.length > 1 ? (
              <div
                className="hero-slide-nav"
                role="tablist"
                aria-label={`${heroSlidesLabel} slides`}
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
                    <span className="hero-slide-trigger-dot" />
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
