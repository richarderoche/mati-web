'use client'
import { usePrefersReducedMotion } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { PbCarouselTabbed } from '@/sanity.types'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNav,
} from '../shared/Carousel'
import ImageBasic from '../shared/ImageBasic'
import SiteWidth from '../shared/SiteWidth'

export default function SectionCarouselTabbed({
  section,
}: {
  section: PbCarouselTabbed
}) {
  const { numberingStyle, imageMode, slides } = section
  const isSequential = numberingStyle === 'sequential'
  const totalSlides = slides?.length || 0
  const prefersReducedMotion = usePrefersReducedMotion()
  const duration = prefersReducedMotion ? 0 : 25
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const tabbedNavRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!api) return
    api.on('select', () => {
      setSelectedIndex(api.selectedScrollSnap())
    })
  }, [api])

  useGSAP(
    () => {
      if (!tabbedNavRef.current) return
      const tabbedNav = tabbedNavRef.current
      const activeContainer = tabbedNavRef.current.querySelectorAll(
        '.tab-container'
      )[selectedIndex] as HTMLElement
      const activeContainerHeight = activeContainer.offsetHeight
      const activeContainerTop =
        activeContainer.getBoundingClientRect().top -
        tabbedNav.getBoundingClientRect().top

      gsap.to('.tab-backdrop', {
        top: `${activeContainerTop}px`,
        height: activeContainerHeight,
        duration: prefersReducedMotion ? 0 : 0.7,
        ease: 'expo.out',
      })
    },
    {
      scope: tabbedNavRef,
      dependencies: [selectedIndex, prefersReducedMotion, section],
    }
  )

  // Skip if no slides yet
  if (totalSlides < 2) {
    return null
  }

  return (
    <Carousel
      opts={{ loop: true, align: 'start', duration }}
      setApi={setApi}
      className="overflow-hidden"
    >
      <SiteWidth>
        <div className="lg:grid lg:grid-cols-12 lg:border-t lg:border-divider corner-container">
          {/* Desktop Tabbed Navigation */}
          <div
            ref={tabbedNavRef}
            className="lg:col-span-7 max-lg:hidden flex flex-col border-r border-divider relative"
          >
            <div className="tab-backdrop absolute left-gut-50 right-gut-50 corner-sm bg-bg-subtle" />
            {slides.map(({ _key, heading, description }, i) => (
              <CarouselNav
                className="block grow border-b border-divider relative z-2"
                key={_key}
                index={i}
              >
                <CarouselTabbedItem
                  heading={heading}
                  description={description}
                  isSequential={isSequential}
                  i={i}
                />
              </CarouselNav>
            ))}
          </div>

          {/* Slide Content */}
          <div className="lg:col-span-5 lg:border-b lg:border-divider lg:p-gut-50">
            <CarouselContent
              classNameViewport={cn(
                'lg:overflow-hidden lg:h-full corner-sm',
                imageMode === 'fit' && 'lg:bg-bg-subtle'
              )}
              className="flex -ml-gut lg:min-h-full"
            >
              {slides.map(({ _key, image, alt, heading, description }, i) => (
                <CarouselItem
                  key={_key}
                  className="min-w-0 shrink-0 grow-0 basis-5/6 lg:basis-full pl-gut"
                >
                  <div className="bg-bg-subtle h-full corner-sm">
                    <div className="lg:h-full max-lg:aspect-square max-lg:p-gut-50">
                      {image && (
                        <ImageBasic
                          image={image}
                          alt={alt}
                          mode={imageMode === 'fill' ? 'cover' : 'contain'}
                          fitTo="manual"
                          ratio={imageMode === 'fill' ? 1 : undefined}
                          className={cn(
                            'max-w-none w-full h-full object-center corner-sm',
                            imageMode === 'fill'
                              ? 'object-cover'
                              : 'object-contain p-gut duration-700 ease-out',
                            imageMode === 'fit' &&
                              i !== selectedIndex &&
                              'lg:scale-0 lg:blur',

                            !prefersReducedMotion && 'lg:transition-all'
                          )}
                          sizes="(min-width: 1024px) 50vw, 80vw"
                        />
                      )}
                    </div>
                    <div className="lg:hidden text-pretty px-gut pt-gut-50 pb-gut flex flex-col gap-gut-50">
                      {heading && (
                        <h3
                          className={cn(
                            isSequential ? 'ts-h4' : 'ts-h1 text-display-subtle'
                          )}
                        >
                          {heading}
                        </h3>
                      )}
                      {description && (
                        <p className={cn(isSequential ? 'ts-p-sm' : 'ts-p-lg')}>
                          {description}
                        </p>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
        </div>

        {/* Mobile Dot Navigation */}
        <div className="mt-gut-75 flex gap-12 lg:hidden">
          {slides.map((slide, i) => (
            <CarouselNav key={slide._key} index={i}>
              <div
                className={cn(
                  'size-12 rounded-full transition-colors border',
                  selectedIndex === i
                    ? 'bg-blue border-blue'
                    : 'bg-transparent border border-divider'
                )}
              />
            </CarouselNav>
          ))}
        </div>
      </SiteWidth>
    </Carousel>
  )
}

function CarouselTabbedItem({
  heading,
  description,
  isSequential,
  i,
}: {
  heading?: string
  description?: string
  isSequential: boolean
  i: number
}) {
  return (
    <div className="p-gut-50 h-full">
      <div className="tab-container p-gut-75 grid grid-cols-6 gap-gut-75 items-center text-left h-full">
        {isSequential ? (
          <div className="col-span-1 aspect-square flex items-center justify-center bg-bg border border-divider rounded-full">
            <h3 className="ts-h4 text-display-subtle tabular-nums">0{i + 1}</h3>
          </div>
        ) : (
          <div className="col-span-3">
            <h3 className="ts-h1 text-display-subtle">{heading}</h3>
          </div>
        )}
        <div className={cn(isSequential ? 'col-span-5' : 'col-span-3')}>
          {isSequential && heading && (
            <h3 className="ts-p-xl text-balance">{heading}</h3>
          )}
          {description && (
            <p
              className={cn(
                'text-balance',
                isSequential ? 'ts-p-sm' : 'ts-p-lg'
              )}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
