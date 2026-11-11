import { useLanguage } from '../../app/useLanguage'
import { useSectionContent } from '../../hooks/useSectionContent'
import SmartLink from '../SmartLink'

export function PillarsSection() {
  const { language } = useLanguage()
  const en = language === 'en'
  const pillars = [
    {
      title: en ? 'Research' : 'Investigación',
      text: en
        ? 'Theoretical questions. Computational perspectives. Explore our scientific directions.'
        : 'Preguntas teóricas. Perspectivas computacionales. Explora nuestras líneas científicas.',
      href: '#research',
    },
    {
      title: en ? 'Scientific Software' : 'Software científico',
      text: en
        ? 'From methods to reusable tools. Discover the code behind the research.'
        : 'De los métodos a herramientas reutilizables. Descubre el código detrás de la investigación.',
      href: '#software',
    },
    {
      title: en ? 'Scientific Communication' : 'Comunicación científica',
      text: en
        ? 'Ideas are meant to be shared. Connect with physics through lectures and conversations.'
        : 'Las ideas son para compartir. Conecta con la física a través de conferencias y conversaciones.',
      href: '#talks',
    },
  ]

  return (
    <section className="pillars-section" aria-labelledby="pillars-title">
      <div className="pillars-intro">
        <p className="section-eyebrow">ANIMAQUANTRIX / {en ? 'What we do' : 'Qué hacemos'}</p>
        <h2 id="pillars-title">
          {en ? 'Inquiry. Computation. Exchange.' : 'Investigar. Calcular. Compartir.'}
        </h2>
      </div>
      <div className="pillars-grid">
        {pillars.map((pillar, index) => (
          <SmartLink className="pillar" key={pillar.href} href={pillar.href}>
            <span className="pillar-number">
              0{index + 1}<span aria-hidden="true">↗</span>
            </span>
            <h3>{pillar.title}</h3>
            <p>{pillar.text}</p>
          </SmartLink>
        ))}
      </div>
    </section>
  )
}

// Add an MP4 source and optional captions when a simulation is ready to publish.
type Simulation = {
  topicIndex: number
  src?: string
  captions?: string
}
const simulations: Simulation[] = [{ topicIndex: 0 }, { topicIndex: 4 }]

export function SimulationsSection() {
  const { language, metadata } = useSectionContent('research')
  const en = language === 'en'

  return (
    <section id="simulations" className="section-panel simulation-section" aria-labelledby="simulations-title">
      <p className="section-eyebrow">
        02 / {en ? 'Scientific simulations' : 'Simulaciones científicas'}
      </p>
      <div className="simulation-heading">
        <h2 id="simulations-title" className="section-title">
          {en ? 'A new perspective on motion.' : 'Una nueva perspectiva del movimiento.'}
        </h2>
        <p>
          {en
            ? 'A space for scientific simulation films. Visual explorations of our research, coming soon.'
            : 'Un espacio para vídeos de simulaciones científicas. Exploraciones visuales de nuestra investigación, próximamente.'}
        </p>
      </div>
      <div className="simulation-grid">
        {simulations.map(({ topicIndex, src, captions }, index) => {
          const topic = metadata.topics[topicIndex]
          if (!topic) return null

          return (
            <article className="simulation-card" key={topicIndex}>
              <div className="simulation-screen">
                {src ? (
                  <video controls playsInline preload="none" poster={topic.image}>
                    <source src={src} type="video/mp4" />
                    {captions ? (
                      <track kind="captions" src={captions} srcLang={language}
                        label={en ? 'English' : 'Español'} default />
                    ) : null}
                  </video>
                ) : (
                  <>
                    <img src={topic.image} alt="" loading="lazy" />
                    <div className="simulation-status">
                      <span aria-hidden="true">▷</span>
                      {en ? 'Video forthcoming' : 'Vídeo próximamente'}
                    </div>
                  </>
                )}
                <span className="simulation-index">SIM / 0{index + 1}</span>
              </div>
              <div className="simulation-copy">
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
                <SmartLink href={`/research#research-item-${topicIndex}`} className="section-item-link">
                  {en ? 'Related research' : 'Investigación relacionada'}
                </SmartLink>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
