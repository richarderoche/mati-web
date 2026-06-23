'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import type { SVGProps } from 'react'
import { useRef } from 'react'

const VIEWBOX_WIDTH = 35
const VIEWBOX_HEIGHT = 20
const CENTER_X = 17.5
const CENTER_Y = 10
const HALF_LENGTH = 17.5
const ANGLE_DEG = 30
const ANGLE_RAD = (ANGLE_DEG * Math.PI) / 180
const COS = Math.cos(ANGLE_RAD)
const SIN = Math.sin(ANGLE_RAD)

// Hamburger: two horizontal lines
const Y_TOP = 2
const Y_BOTTOM = 18
// Converged: both at center y
// X shape: lines through center at ±30°
const X_TOP_LEFT = CENTER_X - HALF_LENGTH * COS
const X_TOP_RIGHT = CENTER_X + HALF_LENGTH * COS
const Y_TOP_LEFT = CENTER_Y - HALF_LENGTH * SIN
const Y_TOP_RIGHT = CENTER_Y + HALF_LENGTH * SIN
// Line 1: top-left to bottom-right
const X1_LINE1 = X_TOP_LEFT
const Y1_LINE1 = Y_TOP_LEFT
const X2_LINE1 = X_TOP_RIGHT
const Y2_LINE1 = Y_TOP_RIGHT
// Line 2: bottom-left to top-right
const X1_LINE2 = X_TOP_LEFT
const Y1_LINE2 = Y_TOP_RIGHT
const X2_LINE2 = X_TOP_RIGHT
const Y2_LINE2 = Y_TOP_LEFT

export default function IconNav({
  isHeaderNavOpen,
  ...props
}: {
  isHeaderNavOpen: boolean
} & SVGProps<SVGSVGElement>) {
  const svgRef = useRef<SVGSVGElement>(null)
  const line1Ref = useRef<SVGLineElement>(null)
  const line2Ref = useRef<SVGLineElement>(null)
  const t = 0.15

  useGSAP(
    () => {
      const line1 = line1Ref.current
      const line2 = line2Ref.current
      if (!line1 || !line2) return

      const tl = gsap.timeline({ overwrite: true })

      if (isHeaderNavOpen) {
        tl.add('converge')
          .to(
            [line1, line2],
            {
              attr: { x1: 0, y1: CENTER_Y, x2: VIEWBOX_WIDTH, y2: CENTER_Y },
              duration: t,
              ease: 'power2.inOut',
            },
            'converge'
          )
          .add('xShape')
          .to(
            line1,
            {
              attr: {
                x1: X1_LINE1,
                y1: Y1_LINE1,
                x2: X2_LINE1,
                y2: Y2_LINE1,
              },
              duration: t + 0.05,
              ease: 'power2.inOut',
            },
            'xShape'
          )
          .to(
            line2,
            {
              attr: {
                x1: X1_LINE2,
                y1: Y1_LINE2,
                x2: X2_LINE2,
                y2: Y2_LINE2,
              },
              duration: t + 0.05,
              ease: 'power2.inOut',
            },
            'xShape'
          )
      } else {
        tl.add('xToConverged')
          .to(
            [line1, line2],
            {
              attr: {
                x1: 0,
                y1: CENTER_Y,
                x2: VIEWBOX_WIDTH,
                y2: CENTER_Y,
              },
              duration: t,
              ease: 'power2.inOut',
            },
            'xToConverged'
          )
          .add('apart')
          .to(
            line1,
            {
              attr: { x1: 0, y1: Y_TOP, x2: VIEWBOX_WIDTH, y2: Y_TOP },
              duration: t,
              ease: 'power2.inOut',
            },
            'apart'
          )
          .to(
            line2,
            {
              attr: { x1: 0, y1: Y_BOTTOM, x2: VIEWBOX_WIDTH, y2: Y_BOTTOM },
              duration: t,
              ease: 'power2.inOut',
            },
            'apart'
          )
      }
    },
    { dependencies: [isHeaderNavOpen], scope: svgRef }
  )

  return (
    <svg
      ref={svgRef}
      width="35"
      height="20"
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line
        ref={line1Ref}
        x1={0}
        y1={Y_TOP}
        x2={VIEWBOX_WIDTH}
        y2={Y_TOP}
        stroke="currentColor"
        strokeWidth="3"
        strokeMiterlimit="10"
      />
      <line
        ref={line2Ref}
        x1={0}
        y1={Y_BOTTOM}
        x2={VIEWBOX_WIDTH}
        y2={Y_BOTTOM}
        stroke="currentColor"
        strokeWidth="3"
        strokeMiterlimit="10"
      />
    </svg>
  )
}
