'use client'
import { usePrefersReducedMotion } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { PbTimeline } from '@/sanity.types'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { PortableTextBlock } from 'next-sanity'
import { useRef } from 'react'
import { Image } from 'sanity'
import { CustomPortableText } from '../shared/CustomPortableText'
import ImageBasic from '../shared/ImageBasic'
import RichTextWrap from '../shared/RichTextWrap'

gsap.registerPlugin(ScrollTrigger)

export default function TimelineRow({
  row,
  isLast = false,
}: {
  isLast?: boolean
  row?: NonNullable<PbTimeline['events']>[number]
}) {
  const { heading, description, image, alt } = row || {}
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (!ref.current || !row || prefersReducedMotion) return
      gsap.set('.timeline-event-content', { opacity: 0, y: 20 })
      gsap.set('.timeline-bullet-point', { opacity: 0, scale: 0 })
      if (!isLast) {
        gsap.set('.timeline-event', { scaleX: 0 })
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          markers: false,
        },
      })
      tl.to('.timeline-bullet-point', {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      })
      tl.to(
        '.timeline-event',
        {
          scaleX: 1,
          duration: isLast ? 0 : 0.5,
          ease: 'power2.out',
        },
        '<'
      )
      tl.to(
        '.timeline-event-content',
        {
          opacity: 1.2,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.1,
        },
        '-=0.2'
      )
    },
    { scope: ref, dependencies: [row] }
  )

  return (
    <div ref={ref} className="flex group/n">
      <div className="flex-1 group-even/n:order-last max-md:hidden group-last/n:hidden"></div>

      <div className="w-1 bg-divider md:group-even/n:order-2 group-last/n:hidden"></div>

      <div className="group-not-last/n:flex-1 md:group-last/n:max-w-max-ch md:group-last/n:mx-auto min-h-gut-600 relative">
        {row && (
          <div className="timeline-event border-t border-divider pt-gut pb-gut-200 pl-gut md:group-even/n:pr-gut md:group-even/n:pl-0 md:group-odd/n:pl-gut flex flex-col gap-gut-50 md:group-last/n:text-center group-last/n:border-none group-last/n:px-0! origin-left md:group-even/n:origin-right">
            <h3 className="timeline-event-content ts-h5 text-body-subtle">
              {heading}
            </h3>
            <div className="timeline-event-content flex gap-x-gut gap-y-gut-75 md:max-lg:flex-col group-last/n:flex-col md:group-last/n:items-center">
              <div className="flex-1">
                <RichTextWrap
                  className={cn('text-balance', isLast ? 'ts-p-xl' : 'ts-p-md')}
                >
                  <CustomPortableText
                    value={description as PortableTextBlock[]}
                  />
                </RichTextWrap>
              </div>

              {image && (
                <div className="w-80 corner-container">
                  <ImageBasic
                    image={image as Image}
                    alt={alt}
                    ratio={1}
                    className="corner-sm"
                    sizes="80px"
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {row && <BulletPoint isLast={isLast} />}
      </div>
    </div>
  )
}

export const BulletPoint = ({ isLast }: { isLast: boolean }) => {
  return (
    <div
      className={cn(
        'timeline-bullet-point size-8 bg-bg border border-divider rounded-full absolute top-0 translate-y-[-50%]',
        isLast
          ? 'left-0 md:left-1/2 translate-x-[-50%]'
          : 'left-0 translate-x-[-50%] md:group-even/n:left-auto md:group-even/n:right-0 md:group-even/n:translate-x-[50%]'
      )}
    ></div>
  )
}
