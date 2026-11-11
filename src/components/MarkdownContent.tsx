import ReactMarkdown, { type Components } from 'react-markdown'
import SmartLink from './SmartLink'

type MarkdownContentProps = {
  content: string
  className?: string
}

const markdownComponents: Components = {
  a: ({ href, children }) => <SmartLink href={href}>{children}</SmartLink>,
}

function MarkdownContent({ content, className }: MarkdownContentProps) {
  if (!content) {
    return null
  }

  return (
    <div className={className}>
      <ReactMarkdown components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownContent
