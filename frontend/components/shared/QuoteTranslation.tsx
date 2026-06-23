'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function QuoteTranslation({
  quoteEnglish,
  quoteNative,
  nativeAlphabet = 'latin',
}: {
  quoteEnglish?: string
  quoteNative?: string
  nativeAlphabet?: 'latin' | 'devanagari'
}) {
  const quoteTranslationRef = useRef<HTMLDivElement>(null)
  const quoteNativeRef = useRef<HTMLDivElement>(null)
  const quoteEnglishRef = useRef<HTMLDivElement>(null)
  const hasBothQuotes = Boolean(quoteEnglish && quoteNative)

  useGSAP(
    () => {
      if (
        !quoteNativeRef.current ||
        !quoteEnglishRef.current ||
        !quoteTranslationRef.current
      )
        return

      const parent = quoteTranslationRef.current
      const nativeEl = quoteNativeRef.current
      const englishEl = quoteEnglishRef.current

      const parentRect = parent.getBoundingClientRect()
      const nativeRect = nativeEl.getBoundingClientRect()

      const parentHeight = parentRect.height
      const centerY = parentHeight / 2

      const nativeTopRelative = nativeRect.top - parentRect.top
      const nativeCenter = nativeTopRelative + nativeRect.height / 2
      const deltaNative = centerY - nativeCenter

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(parent, { visibility: 'visible' })
        return () => {}
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(nativeEl, { y: deltaNative })
        gsap.set(englishEl, { opacity: 0 })
        gsap.set(parent, { visibility: 'visible' })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: parent,
            start: 'top bottom',
            toggleActions: 'play none none none',
            markers: false,
          },
        })
        tl.to(
          nativeEl,
          { y: 0, duration: 1, ease: 'power3.out', delay: 0.2 },
          0
        )
        tl.to(
          englishEl,
          { opacity: 1, duration: 1.5, ease: 'power2.out', delay: 0.5 },
          0
        )
      })
    },
    {
      scope: quoteTranslationRef,
      dependencies: [hasBothQuotes, quoteEnglish, quoteNative],
    }
  )

  if (!quoteEnglish) return null

  const nativeAlphabetClass =
    nativeAlphabet === 'devanagari' ? 'font-devanagari' : 'font-sans'

  return (
    <div
      ref={quoteTranslationRef}
      className="flex flex-col gap-gut-75 text-balance text-body-subtle"
      style={hasBothQuotes ? { visibility: 'hidden' } : undefined}
    >
      {quoteNative && (
        <div ref={quoteNativeRef} className={nativeAlphabetClass}>
          <p className="hanging-quotes">{quoteNative}</p>
        </div>
      )}
      <div ref={quoteEnglishRef}>
        <p className="hanging-quotes">{quoteEnglish}</p>
      </div>
    </div>
  )
}
