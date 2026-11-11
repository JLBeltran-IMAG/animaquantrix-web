import type { ContentButton } from '../../lib/content'
import SmartLink from '../SmartLink'

type SectionButtonsProps = {
  buttons: ContentButton[]
  activeCollectionKey?: string
}

function SectionButtons({ buttons, activeCollectionKey }: SectionButtonsProps) {
  if (buttons.length === 0) return null

  return (
    <div className="section-buttons">
      {buttons.map((button, index) => {
        const variant = activeCollectionKey
          ? button.href.endsWith(`#${activeCollectionKey}`) ? 'active' : 'neutral'
          : index === 0 ? 'primary' : 'secondary'

        return (
          <SmartLink key={`${button.label}-${button.href}`} href={button.href}
            className={`section-button section-button--${variant}`}>
            {button.label}
          </SmartLink>
        )
      })}
    </div>
  )
}

export default SectionButtons
