'use client'

import { useGSAP } from '@gsap/react'
import { FocusTrap } from 'focus-trap-react'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'

import NavLinks from '@/components/shared/NavLinks'
import { useOrientation } from '@/lib/hooks'
import { useStore } from '@/lib/store'
import { cn, getImagePosition } from '@/lib/utils'
import { PbBlockButton, SettingsQueryResult } from '@/sanity.types'
import Link from 'next/link'
import IconLogoSymbol from '../icons/IconLogoSymbol'
import IconNav from '../icons/IconNav'
import { ButtonBlock } from '../pb/ButtonBlock'
import ImageBasic from '../shared/ImageBasic'
import SiteWidth from '../shared/SiteWidth'

export default function HeaderNav({ data }: { data: SettingsQueryResult }) {
  const {
    mainNav,
    mainNav2,
    mainNavImage,
    mainNavImageAltText,
    mainNavImagePosition,
    title,
    ctaButton,
  } = data || {}
  const hasMainNav = mainNav && mainNav.length > 0
  const hasMainNav2 = mainNav2 && mainNav2.length > 0
  const imagePosition = getImagePosition(
    mainNavImagePosition || 'center center'
  )
  const isHeaderNavOpen = useStore((state) => state.isHeaderNavOpen)
  const setIsHeaderNavOpen = useStore((state) => state.setIsHeaderNavOpen)
  const { isPortrait, isLandscape } = useOrientation()
  const orientationReady = isPortrait || isLandscape
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsHeaderNavOpen(false)
      }
    }
    if (isHeaderNavOpen) {
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isHeaderNavOpen, setIsHeaderNavOpen])

  useGSAP(
    () => {
      if (!orientationReady || !navRef.current) return
      const nav = navRef.current
      if (isHeaderNavOpen) {
        nav.style.opacity = '1'
        nav.style.pointerEvents = 'auto'
      }
      gsap.to(nav, {
        x: isHeaderNavOpen ? 0 : isPortrait ? '100%' : 0,
        y: isHeaderNavOpen ? 0 : isLandscape ? '-100%' : 0,
        duration: isHeaderNavOpen ? 0.6 : 0.3,
        ease: 'expo.out',
        onComplete: () => {
          if (navRef.current && !isHeaderNavOpen) {
            navRef.current.style.opacity = '0'
            navRef.current.style.pointerEvents = 'none'
          }
        },
      })
    },
    {
      dependencies: [
        isHeaderNavOpen,
        isPortrait,
        isLandscape,
        orientationReady,
      ],
    }
  )

  return (
    <FocusTrap active={isHeaderNavOpen}>
      <div>
        <div className="fixed top-0 right-0 w-full z-9999 pointer-events-none">
          <SiteWidth className="h-header flex items-end justify-between">
            <Link
              className="block h-header-ico-h w-auto pointer-events-auto"
              href="/"
              onClick={() => setIsHeaderNavOpen(false)}
            >
              <IconLogoSymbol
                className="h-header-ico-h w-auto text-blue"
                aria-hidden="true"
              />
              <span className="sr-only">{title}</span>
            </Link>
            <button
              onClick={() => setIsHeaderNavOpen(!isHeaderNavOpen)}
              aria-expanded={isHeaderNavOpen}
              aria-controls="mobile-nav"
              aria-label="Toggle Menu"
              className="text-blue pointer-events-auto"
            >
              <IconNav
                className="w-[34px] h-[20px]"
                isHeaderNavOpen={isHeaderNavOpen}
              />
            </button>
          </SiteWidth>
        </div>

        <nav
          id="mobile-nav"
          ref={navRef}
          className={`fixed top-0 bottom-0 left-0 w-full light-theme z-10 overflow-auto portrait:translate-x-full landscape:-translate-y-full pt-header ${!isHeaderNavOpen ? 'opacity-0 pointer-events-none' : ''}`}
          data-lenis-prevent
          role="navigation"
          aria-label="Mobile Navigation"
          inert={!isHeaderNavOpen}
        >
          <SiteWidth className="py-gut lg:h-full">
            <div className="flex flex-col lg:flex-row lg:h-full bg-red-500/0 ">
              {hasMainNav && (
                <MainNavColumn
                  navGroups={mainNav}
                  setIsHeaderNavOpen={setIsHeaderNavOpen}
                />
              )}
              {hasMainNav2 && (
                <MainNavColumn
                  navGroups={mainNav2}
                  setIsHeaderNavOpen={setIsHeaderNavOpen}
                />
              )}

              {mainNavImage && (
                <div
                  className={cn(
                    'border-t border-divider pt-gut-50 pl-gut-50 corner-container',
                    hasMainNav && hasMainNav2 ? 'basis-1/2' : 'basis-3/4'
                  )}
                >
                  <div className="relative lg:h-full w-full corner lg:overflow-hidden dark-theme theme-vars-only">
                    <ImageBasic
                      image={mainNavImage}
                      alt={mainNavImageAltText}
                      fitTo="manual"
                      ratio={1.5}
                      className="lg:absolute inset-0 object-cover lg:max-w-none w-full lg:h-full mix-blend-luminosity"
                      sepia={true}
                      style={{
                        objectPosition: imagePosition,
                      }}
                    />
                    {ctaButton && (
                      <div className="absolute top-gut-75 left-gut-75 z-10 ">
                        <ButtonBlock
                          block={ctaButton as unknown as PbBlockButton}
                          onClick={() => setIsHeaderNavOpen(false)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </SiteWidth>
        </nav>
      </div>
    </FocusTrap>
  )
}

const MainNavColumn = ({ navGroups, setIsHeaderNavOpen }) => {
  return (
    <div className="lg:basis-1/4 lg:h-full lg:border-r border-divider overflow-auto touch-manipulation no-scrollbar">
      {navGroups.map((navGroup) => (
        <div className="py-gut-50 border-t border-divider" key={navGroup._key}>
          {navGroup.title && (
            <h2 className="ts-h5 text-body-subtle mx-gut-50 mb-gut-50">
              {navGroup.title}
            </h2>
          )}
          <NavLinks
            navItems={navGroup.navItems || []}
            ulClasses="flex flex-col gap-4 ts-p-lg text-display mx-gut-50 corner-container"
            liClasses="flex corner-sm hover:bg-divider hover:text-body hover:scale-103 transition-all duration-300 ease-out"
            liActiveClasses="bg-bg-subtle"
            linkClasses="block px-gut-50 py-gut-25"
            onClick={() => setIsHeaderNavOpen(false)}
          />
        </div>
      ))}
    </div>
  )
}
