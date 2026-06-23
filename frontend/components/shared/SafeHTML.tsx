'use client'
import DOMPurify from 'isomorphic-dompurify'
import { useMemo } from 'react'

export default function SafeHTML({
  html,
  ...rest
}: { html: string } & React.ComponentPropsWithoutRef<'div'> &
  React.HTMLAttributes<HTMLDivElement>) {
  const sanitizedContent = useMemo(
    () => ({
      __html: DOMPurify.sanitize(html),
    }),
    [html]
  )
  return <div dangerouslySetInnerHTML={sanitizedContent} {...rest} />
}
