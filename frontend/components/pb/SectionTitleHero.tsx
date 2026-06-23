'use client'

import {
  cn,
  getGridClasses,
  getImagePosition,
  getOuterSettings,
} from '@/lib/utils'
import { PbTitleSection } from '@/sanity.types'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import ImageBasic from '../shared/ImageBasic'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'

export default function SectionTitleHero({
  section,
  isFirst,
}: {
  section: PbTitleSection
  isFirst: boolean
}) {
  const {
    rowWidth,
    titleMode,
    title,
    subtitle,
    image,
    heroImageAltText,
    heroImagePosition,
  } = section
  const heroRef = useRef<HTMLImageElement>(null)

  // Prep attributes
  const outerSettings = getOuterSettings(rowWidth)
  const outerClasses = outerSettings ? getGridClasses(outerSettings) : ''
  const shortHeading = (subtitle?.length || 0) < 90
  let headingTsClass: string
  switch (true) {
    case rowWidth === 12:
      headingTsClass = 'ts-page-title-h1'
      break
    case shortHeading && rowWidth === 10:
      headingTsClass = 'ts-page-title-h1'
      break
    case rowWidth === 10:
      headingTsClass = 'ts-page-title-h2'
      break
    case shortHeading && rowWidth === 8:
      headingTsClass = 'ts-page-title-h2'
      break
    default:
      headingTsClass = 'ts-page-title-h3'
  }
  const imagePosition = getImagePosition(heroImagePosition || 'center center')
  const heroSizeClasses =
    'w-full aspect-video widescreen:aspect-auto widescreen:h-screen'

  useGSAP(
    () => {
      if (!heroRef.current || !isFirst) return
      gsap.set('.hero-image', {
        opacity: 0.88,
        clipPath: 'inset(0 0 0 0)',
      })
      gsap.to('.hero-image', {
        opacity: 0,
        scrollTrigger: {
          trigger: '.hero-overlay',
          start: 'top top',
          end: 'bottom 50px',
          scrub: true,
          markers: false,
        },
      })
      gsap.to('.hero-image', {
        clipPath: 'inset(0 0 100% 0)',
        scrollTrigger: {
          trigger: '.hero-overlay',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          markers: false,
        },
      })
    },
    { scope: heroRef, dependencies: [section], revertOnUpdate: true }
  )

  return (
    <>
      {titleMode === 'hero' && (
        <div ref={heroRef} className={cn('relative', heroSizeClasses)}>
          {image && (
            <ImageBasic
              image={image}
              alt={heroImageAltText || ''}
              mode="cover"
              fitTo="manual"
              sizes="100vw"
              priority
              className={cn(
                heroSizeClasses,
                'hero-image object-cover',
                isFirst ? 'fixed pointer-events-none -top-1' : 'absolute'
              )}
              style={{
                objectPosition: imagePosition,
              }}
              maxDimension={1000}
              quality={60}
            />
          )}
          <div className="hero-overlay bg-ease-to-t from-bg relative z-1 w-full h-full flex flex-col justify-end">
            <SiteWidth className="hidden widescreen:block">
              <SiteGrid>
                <div className="col-span-12 pb-gut-200">
                  <LabeledHeading
                    label={title}
                    labelColorClass="text-body"
                    heading={subtitle}
                    headingTsClass="ts-page-title-h1"
                    isFirst={isFirst}
                  />
                </div>
              </SiteGrid>
            </SiteWidth>
          </div>
          <div className="widescreen:hidden bg-bg relative">
            <SiteWidth>
              <SiteGrid>
                <div className="col-span-12 py-gut">
                  <LabeledHeading
                    label={title}
                    labelColorClass="text-body"
                    heading={subtitle}
                    headingTsClass="ts-page-title-h1"
                    isFirst={isFirst}
                  />
                </div>
              </SiteGrid>
            </SiteWidth>
          </div>
        </div>
      )}
      {titleMode === 'text' && (
        <SiteWidth
          className={cn(
            'pb-gut-50',
            isFirst ? 'pt-gut-300 lg:pt-gut-200' : 'pt-gut-300'
          )}
        >
          <SiteGrid>
            <div className={outerClasses}>
              <LabeledHeading
                label={title}
                heading={subtitle}
                headingTsClass={headingTsClass}
                isFirst={isFirst}
              />
            </div>
          </SiteGrid>
        </SiteWidth>
      )}
    </>
  )
}

export const LabeledHeading = ({
  label,
  labelColorClass = 'text-body-subtle',
  heading,
  headingTsClass = 'ts-h1',
  isFirst = false,
}: {
  label?: string
  labelColorClass?: string
  heading?: string
  headingTsClass: string
  isFirst?: boolean
}) => {
  if (!heading && !label) return null
  const TopTag = isFirst ? 'h1' : 'h2'
  const BottomTag = isFirst ? 'h2' : 'h3'
  const HeadingTag = label ? BottomTag : TopTag

  return (
    <div className="flex flex-col gap-y-gut">
      {label && (
        <TopTag className={cn('ts-h5', labelColorClass)}>{label}</TopTag>
      )}
      {heading && (
        <HeadingTag className={cn(headingTsClass, 'text-balance')}>
          {heading}
        </HeadingTag>
      )}
    </div>
  )
}
