'use client'

import { PbSequenceVertical } from '@/sanity.types'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { PortableTextBlock } from 'next-sanity'
import { useRef } from 'react'
import { CustomPortableText } from '../shared/CustomPortableText'
import RichTextWrap from '../shared/RichTextWrap'
import { LeadingZero } from './SectionDetailedList'

export default function VerticalStep({
  step,
  isLast,
  index,
}: {
  step: NonNullable<PbSequenceVertical['sequenceSteps']>[number]
  isLast: boolean
  index: number
}) {
  const { title, description } = step || {}
  const ref = useRef<HTMLDivElement>(null)
  gsap.registerPlugin(ScrollTrigger)

  useGSAP(
    () => {
      if (!ref.current || isLast) return

      const mm = gsap.matchMedia()

      mm.add('(orientation: landscape) and (min-width: 768px)', () => {
        gsap.to(ref.current, {
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: 'bottom 25%',
            scrub: true,
            markers: false,
            pin: true,
          },
          opacity: 0,
          ease: 'linear',
        })
      })
    },
    { scope: ref, dependencies: [step], revertOnUpdate: true }
  )

  return (
    <div
      ref={ref}
      className="flex flex-col gap-gut md:landscape:justify-center md:landscape:min-h-screen"
    >
      <div className="grid grid-cols-6 gap-gut">
        <div className="col-span-1 border-t border-divider pt-gut">
          <p className="ts-h5 text-blue tabular-nums">{LeadingZero(index)}</p>
        </div>
        <div className="flex flex-col gap-gut col-span-5 border-t border-divider pt-gut">
          <h3 className="ts-p-xl">{title}</h3>
          <RichTextWrap>
            <CustomPortableText value={description as PortableTextBlock[]} />
          </RichTextWrap>
        </div>
      </div>
    </div>
  )
}
