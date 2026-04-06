import ReactMarkdown from 'react-markdown'
import SmartLink from './SmartLink'

type MarkdownContentProps = {
  content: string
  className?: string
}

function MarkdownContent({ content, className }: MarkdownContentProps) {
  if (!content) {
    return null
  }

  return (
    <div className={className}>
      <ReactMarkdown
        components={{
          p: ({ children }) => <p>{children}</p>,
          ul: ({ children }) => <ul>{children}</ul>,
          li: ({ children }) => <li>{children}</li>,
          h1: ({ children }) => <h1>{children}</h1>,
          h2: ({ children }) => <h2>{children}</h2>,
          h3: ({ children }) => <h3>{children}</h3>,
          strong: ({ children }) => <strong>{children}</strong>,
          a: ({ href, children }) => <SmartLink href={href}>{children}</SmartLink>,
          hr: () => <hr />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownContent
