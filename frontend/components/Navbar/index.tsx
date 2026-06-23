import { sanityFetch } from '@/sanity/lib/live'
import { settingsQuery } from '@/sanity/lib/queries'
import SiteWidth from '../shared/SiteWidth'
import HeaderNav from './HeaderNav'
import SkipLink from './SkipLink'

export default async function Navbar() {
  const { data } = await sanityFetch({
    query: settingsQuery,
    stega: false,
  })

  const { mainNav } = data || {}

  return (
    <header>
      <SkipLink />
      <SiteWidth className="flex items-center justify-between gap-x-gut ts-p-md">
        {mainNav && (
          <nav role="navigation">
            <HeaderNav data={data} />
          </nav>
        )}
      </SiteWidth>
    </header>
  )
}
