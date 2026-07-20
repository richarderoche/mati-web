import Link from 'next/link'
import Pill from '../shared/Pill'

export function PublicationsListBlock({ publication }) {
  const {
    title,
    description,
    authors,
    dateLabel,
    linkType,
    url,
    fileUrl,
    linkText,
  } = publication
  const href =
    linkType === 'externalLink' ? url : linkType === 'file' ? fileUrl : null
  if (!href) return null
  const label = linkText || href
  return (
    <div className="border-t border-divider py-gut text-pretty">
      <Link
        href={href}
        target={linkType === 'externalLink' ? '_blank' : undefined}
        rel={linkType === 'externalLink' ? 'noopener noreferrer' : undefined}
        className="block theme-vars-only"
        onMouseEnter={(e) => {
          if (window.matchMedia('(pointer: fine)').matches) {
            e.currentTarget.classList.add('light-theme')
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.classList.remove('light-theme')
        }}
      >
        <div className="flex flex-col gap-gut-50 corner-sm p-gut-50 bg-bg-subtle text-body-subtle transition-colors">
          <div className="flex flex-wrap gap-x-gut-25 gap-y-gut-50 items-center justify-between mb-gut-25">
            {dateLabel && (
              <Pill className="border border-divider">{dateLabel}</Pill>
            )}
            <p className="ts-p-xs">{label}</p>
          </div>
          <h4 className="ts-h4-serif text-body transition-colors">{title}</h4>
          {description && <p className="ts-p-xs">{description}</p>}
          {authors && (
            <p className="ts-p-xs">
              {authors.map((author, i) => (
                <span key={author._key} className="font-bold">
                  {i > 0 && <span>, </span>}
                  <span className={author.highlight && 'text-blue'}>
                    {author.name}
                  </span>
                </span>
              ))}
            </p>
          )}
        </div>
      </Link>
    </div>
  )
}
