import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type SmartLinkProps = {
  href?: string
  className?: string
  children: ReactNode
}

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href)
}

function SmartLink({ href, className, children }: SmartLinkProps) {
  if (!href) {
    return null
  }

  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    )
  }

  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  )
}

export default SmartLink
