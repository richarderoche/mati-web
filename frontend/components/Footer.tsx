import NavLinks from '@/components/shared/NavLinks'
import SiteWidth from '@/components/shared/SiteWidth'
import type { SettingsQueryResult } from '@/sanity.types'
import { sanityFetch } from '@/sanity/lib/live'
import { settingsQuery } from '@/sanity/lib/queries'
import { NavItem } from '@/types'
import { PortableTextBlock } from 'next-sanity'
import IconLogoLockup from './icons/IconLogoLockup'
import Button from './shared/Button'
import CurrentYear from './shared/CurrentYear'
import { CustomPortableText } from './shared/CustomPortableText'
import MailchimpEmail from './shared/MailchimpEmail'
import RichTextWrap from './shared/RichTextWrap'
import SocialIconList from './shared/SocialIconList'

export default async function Footer() {
  const { data } = await sanityFetch({
    query: settingsQuery,
    stega: false,
  })
  const settings = (data ?? {}) as NonNullable<SettingsQueryResult>
  const {
    footerBlurb,
    footerCTAButton,
    footerCTAButton2,
    footerCTA2Type,
    footerCTAMailchimp,
    footerCompanyName,
    footerLocations,
    footerNav,
    footerSecondaryNav,
    socialIcons,
    title,
  } = settings

  const hasSocialIcons = socialIcons && socialIcons?.length > 0
  const hasActions = footerCTAButton || hasSocialIcons
  const hasFooterNav = footerNav && footerNav?.length > 0
  const hasFooterSecondaryNav =
    footerSecondaryNav && footerSecondaryNav?.length > 0
  const hasMailchimp =
    footerCTA2Type === 'mailchimp' &&
    footerCTAMailchimp?.mcFormUrl &&
    footerCTAMailchimp?.mcEmailName

  return (
    <footer className="bottom-0 pt-gut-400">
      <SiteWidth>
        {/* Footer Main */}

        <div className="border-t border-b border-divider grid grid-cols-1 md:grid-cols-2 md:gap-x-gut lg:grid-cols-12 lg:bg-divider lg:gap-1">
          {/* Footer Logo */}
          <div className="md:col-span-2 lg:col-span-5 bg-bg py-gut lg:pr-gut">
            <IconLogoLockup className="h-auto w-full" />
          </div>

          {/* Blurb, CTA, & Social Icons */}
          <div className="lg:col-span-3 bg-bg py-gut lg:px-gut flex flex-col justify-between gap-gut">
            {footerBlurb && (
              <RichTextWrap className="ts-p-sm">
                <CustomPortableText
                  value={footerBlurb.textContent as PortableTextBlock[]}
                />
              </RichTextWrap>
            )}
            {hasActions && (
              <div className="flex justify-between items-center gap-gut-50">
                {footerCTAButton && (
                  <Button navItem={footerCTAButton as NavItem} />
                )}
                {hasSocialIcons && <SocialIconList socialIcons={socialIcons} />}
              </div>
            )}
          </div>
          {/* Footer Nav / Newsletter (TODO) */}
          <div className="lg:col-span-4 bg-bg py-gut lg:pl-gut flex flex-col justify-between gap-gut">
            {hasFooterNav && (
              <nav role="navigation">
                <ul className="grid grid-cols-2 lg:grid-cols-3 gap-x-gut gap-y-gut-50">
                  {footerNav.map((navItem, key) => {
                    return (
                      <li key={key}>
                        <Button navItem={navItem as NavItem} style="alt" />
                      </li>
                    )
                  })}
                </ul>
              </nav>
            )}
            {footerCTA2Type === 'button' && footerCTAButton2 && (
              <Button navItem={footerCTAButton2 as NavItem} />
            )}
            {hasMailchimp && (
              <div className="">
                {footerCTAMailchimp?.heading && (
                  <h3 className="ts-h6 text-body-subtle mb-gut-25">
                    {footerCTAMailchimp?.heading}
                  </h3>
                )}
                <MailchimpEmail
                  mcFormUrl={footerCTAMailchimp.mcFormUrl as string}
                  mcEmailName={footerCTAMailchimp.mcEmailName as string}
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer Meta */}

        <div className="flex flex-col gap-gut-50 md:flex-row md:justify-between text-body-subtle ts-h6 py-gut-150 md:py-gut">
          {(footerLocations || hasFooterSecondaryNav) && (
            <div className="flex">
              {footerLocations && <div>{footerLocations}</div>}
              {hasFooterSecondaryNav && (
                <>
                  {footerLocations && <Sep />}
                  <nav role="navigation">
                    <NavLinks
                      navItems={footerSecondaryNav}
                      ulClasses="flex flex-wrap gap-em"
                    />
                  </nav>
                </>
              )}
            </div>
          )}

          <div className="flex">
            &copy; {footerCompanyName || title} <CurrentYear /> <Sep /> All
            Rights Reserved.
          </div>
        </div>
      </SiteWidth>
    </footer>
  )
}

const Sep = () => {
  return <span className="text-divider mx-[.5em]">|</span>
}
