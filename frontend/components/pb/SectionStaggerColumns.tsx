'use client'
import { cn, getGridClasses, getOuterSettings } from '@/lib/utils'
import { PbStaggerColumns } from '@/sanity.types'
import { PortableTextBlock } from 'next-sanity'
import { Image } from 'sanity'
import { CustomPortableText } from '../shared/CustomPortableText'
import ImageBasic from '../shared/ImageBasic'
import RichTextWrap from '../shared/RichTextWrap'
import SiteWidth, { SITE_MAX_WIDTH } from '../shared/SiteWidth'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function SectionStaggerColumns({
  section,
}: {
  section: PbStaggerColumns
}) {
  const { title, rowWidth, columns } = section
  const colCount = columns?.length || 0
  const containerRef = useRef<HTMLDivElement>(null)

  // Prep attributes
  const outerSettings = getOuterSettings(rowWidth)
  const outerClasses = outerSettings ? getGridClasses(outerSettings) : ''
  const sizesString = `(min-width: ${SITE_MAX_WIDTH}px) ${SITE_MAX_WIDTH / colCount}px, (min-width: 1024px) ${90 / colCount}vw, 30vw`

  useGSAP(
    () => {
      if (!containerRef.current || colCount < 2 || colCount > 4) return
      const mm = gsap.matchMedia()

      mm.add(
        '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        () => {
          gsap.set('.stagger-item', { opacity: 0, scale: 0.8 })
          gsap.set('.stagger-item-text', { y: '120px', opacity: 0 })
          // Show after all items are set
          gsap.set(containerRef.current, { opacity: 1 })
          // Fade in first item
          gsap.to('.stagger-item', {
            opacity: 1,
            scale: 1,
            stagger: 1 / colCount,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 65%',
              end: 'top top',
              scrub: true,
              markers: false,
            },
            ease: 'linear',
          })
          // Scroll in staggered items
          gsap.to('.stagger-item-text', {
            y: 0,
            opacity: 1,
            stagger: 1 / colCount,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end:
                colCount === 2 ? '240px' : colCount === 3 ? '360px' : '480px',
              scrub: true,
              markers: false,
              pin: true,
            },
            ease: 'linear',
          })
        }
      )
    },
    {
      scope: containerRef,
      dependencies: [colCount, columns],
      revertOnUpdate: true,
    }
  )

  // Skip if wrong number of columns
  if (!columns || colCount < 2 || colCount > 4) {
    return null
  }

  return (
    <SiteWidth className="pt-gut-300 lg:pt-0">
      <div className="grid grid-cols-12">
        <div ref={containerRef} className={cn(outerClasses, 'lg:opacity-0')}>
          <div className="flex flex-col gap-gut-200 lg:pt-gut-200">
            {title && (
              <h2 className="lg:pt-header ts-h2 lg:text-center text-balance">
                {title}
              </h2>
            )}
            <div
              className={cn(
                'grid grid-cols-1 gap-y-gut-300 gap-x-gut-200',
                colCount === 2
                  ? 'lg:grid-cols-2'
                  : colCount === 3
                    ? 'lg:grid-cols-3'
                    : 'lg:grid-cols-4 lg:gap-x-gut'
              )}
            >
              {columns.map(({ _key, heading, description, image, alt }) => (
                <div
                  key={_key}
                  className="stagger-item max-lg:grid max-lg:grid-cols-5 items-center gap-gut-200"
                >
                  {image && (
                    <div className="corner-container mb-gut-200 max-lg:mb-0 col-span-2">
                      <ImageBasic
                        image={image as Image}
                        alt={alt}
                        sizes={sizesString}
                        fitTo="manual"
                        mode="contain"
                        className="lg:h-[33vh] w-full object-contain object-center corner"
                      />
                    </div>
                  )}
                  <div className="stagger-item-text flex flex-col gap-gut-50 col-span-3">
                    {heading && (
                      <h3 className="ts-h5 text-body-subtle">{heading}</h3>
                    )}
                    {description && (
                      <RichTextWrap>
                        <CustomPortableText
                          value={description as PortableTextBlock[]}
                        />
                      </RichTextWrap>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SiteWidth>
  )
}
