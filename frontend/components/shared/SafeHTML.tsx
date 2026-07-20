'use client'
import DOMPurify from 'dompurify'
import { useEffect, useState } from 'react'

export default function SafeHTML({
  html,
  ...rest
}: { html: string } & React.ComponentPropsWithoutRef<'div'> &
  React.HTMLAttributes<HTMLDivElement>) {
  const [sanitizedHtml, setSanitizedHtml] = useState('')

  useEffect(() => {
    setSanitizedHtml(DOMPurify.sanitize(html))
  }, [html])

  if (!sanitizedHtml) return <div {...rest} />

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} {...rest} />
}
