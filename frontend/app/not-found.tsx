import Link from 'next/link'

import { PageHeader } from '@/components/shared/PageHeader'
import PageWrapper from '@/components/shared/PageWrapper'
import RichTextWrap from '@/components/shared/RichTextWrap'
import SiteWidth from '@/components/shared/SiteWidth'

export default function NotFound() {
  return (
    <PageWrapper className="mt-gut">
      <PageHeader title="Not Found" />
      <SiteWidth className="mt-gut">
        <RichTextWrap>
          <p className="text-pretty">
            Sorry, could not find the page at that requested URL.
          </p>
          <Link className="inline-link not-prose" href="/">
            Return Home
          </Link>
        </RichTextWrap>
      </SiteWidth>
    </PageWrapper>
  )
}
