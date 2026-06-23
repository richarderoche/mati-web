'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface RevealerProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'fade-up' | 'fade-right' | 'fade-only' | 'none'
}

const TRIGGER_START = 'top 95%'
const DURATION = 1.3
const EASE = 'power2.out'
const DELAY = 0.2

export default function Revealer({
  children,
  direction = 'fade-up',
  ...props
}: RevealerProps) {
  const ref = useRef<HTMLDivElement>(null)

  const MOVE_DISTANCE = direction === 'fade-only' ? 0 : 40

  useGSAP(
    () => {
      if (direction === 'none') return

      const el = ref.current
      if (!el) return

      const fromMove =
        direction === 'fade-right'
          ? { x: -MOVE_DISTANCE }
          : { y: MOVE_DISTANCE }
      const toMove = direction === 'fade-right' ? { x: 0 } : { y: 0 }

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        return gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1,
            duration: DURATION,
            ease: EASE,
            delay: DELAY,
            scrollTrigger: {
              trigger: el,
              start: TRIGGER_START,
              markers: false,
            },
          }
        )
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        return gsap.fromTo(
          el,
          { opacity: 0, ...fromMove },
          {
            opacity: 1,
            ...toMove,
            duration: DURATION,
            ease: EASE,
            delay: DELAY,
            scrollTrigger: {
              trigger: el,
              start: TRIGGER_START,
              markers: false,
            },
          }
        )
      })

      return () => mm.revert()
    },
    { scope: ref, dependencies: [direction] }
  )

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  )
}
