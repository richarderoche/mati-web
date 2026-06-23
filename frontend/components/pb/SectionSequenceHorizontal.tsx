'use client'
import { PbSequenceHorizontal } from '@/sanity.types'

import { cn, getGridClasses, getOuterSettings } from '@/lib/utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useRef, useState } from 'react'
import ImageBasic from '../shared/ImageBasic'
import Lottie from '../shared/Lottie'
import SepiaOverlays from '../shared/SepiaOverlays'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'
import { PlainTextBlock } from './PbBlocks'

// Scroll distance per step
const STEP_SCROLL_D = 250
// Dwell time between phases
const BETWEEN_PHASE_D = STEP_SCROLL_D * 0.5

export default function SectionSequenceHorizontal({
  section,
}: {
  section: PbSequenceHorizontal
}) {
  const { rowWidth, sequencePhases } = section
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0)
  const [activePhaseScrubProgress, setActivePhaseScrubProgress] =
    useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const totalSteps =
    sequencePhases?.reduce((acc, phase) => acc + phase.steps.length, 0) || 0
  const numPhases = sequencePhases?.length ?? 0
  const totalScrollDistance =
    totalSteps * STEP_SCROLL_D + Math.max(0, numPhases - 1) * BETWEEN_PHASE_D

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(
    () => {
      if (!containerRef.current || !sequencePhases) return

      gsap.set('.phase-step', {
        opacity: 0,
        y: STEP_SCROLL_D / 10,
      })
      gsap.set(containerRef.current, { opacity: 1 })

      // Scroll positions where active phase becomes i+1 (after dwell; not one entry for last phase)
      const phaseEndDistances: number[] = []
      let cumulativeSteps = 0
      sequencePhases.forEach((phase, i) => {
        cumulativeSteps += phase.steps.length
        if (i < sequencePhases.length - 1) {
          phaseEndDistances.push(
            cumulativeSteps * STEP_SCROLL_D + (i + 1) * BETWEEN_PHASE_D
          )
        }
      })

      const updatePhaseScrollState = (progress: number) => {
        const scrolled = progress * totalScrollDistance
        let active = sequencePhases.length - 1
        for (let i = 0; i < phaseEndDistances.length; i++) {
          if (scrolled < phaseEndDistances[i]) {
            active = i
            break
          }
        }
        setActivePhaseIndex(active)
        const startScroll = active === 0 ? 0 : phaseEndDistances[active - 1]
        const endScroll =
          active < sequencePhases.length - 1
            ? phaseEndDistances[active]
            : totalScrollDistance
        const span = endScroll - startScroll
        const scrubProgress =
          span <= 0
            ? 0
            : Math.min(1, Math.max(0, (scrolled - startScroll) / span))
        setActivePhaseScrubProgress(scrubProgress)
      }

      const perStep = STEP_SCROLL_D / totalScrollDistance
      const dwellT = BETWEEN_PHASE_D / totalScrollDistance
      const fadeDur = STEP_SCROLL_D / 3 / totalScrollDistance
      const lastPhaseIndex = sequencePhases.length - 1

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalScrollDistance}`,
          pin: true,
          scrub: true,
          markers: false,
          onUpdate: (self) => updatePhaseScrollState(self.progress),
        },
      })

      let t = 0
      for (let phaseIdx = 0; phaseIdx < sequencePhases.length; phaseIdx++) {
        const phaseStepEls = gsap.utils.toArray<HTMLElement>(
          `.phase-${phaseIdx} .phase-step`,
          containerRef.current
        )
        const n = phaseStepEls.length
        if (n > 0) {
          tl.to(
            phaseStepEls,
            {
              opacity: 1,
              y: 0,
              duration: perStep,
              stagger: { each: perStep },
              ease: 'none',
            },
            t
          )
          t += n * perStep
        }

        if (phaseIdx < lastPhaseIndex) {
          tl.to(containerRef.current, { duration: dwellT }, t)
          t += dwellT
          const nextN = sequencePhases[phaseIdx + 1]?.steps.length ?? 0
          const fadeCap = nextN * perStep
          tl.to(
            `.phase-${phaseIdx}`,
            {
              opacity: 0,
              duration: Math.min(fadeDur, fadeCap || fadeDur),
              ease: 'linear',
            },
            t
          )
        }
      }

      // Clean up
      setActivePhaseIndex(0)
      setActivePhaseScrubProgress(0)
    },
    {
      scope: containerRef,
      dependencies: [section],
      revertOnUpdate: true,
    }
  )

  // Skip if no phases yet
  if (!sequencePhases || sequencePhases.length === 0) {
    return null
  }

  const outerSettings = getOuterSettings(rowWidth)
  const outerClasses = outerSettings ? getGridClasses(outerSettings) : ''

  return (
    <SiteWidth>
      <SiteGrid>
        <div ref={containerRef} className={cn(outerClasses, 'opacity-0')}>
          <div className="pt-header">
            <div className="py-gut-200 bg-bg relative z-1 ts-h5">
              <div className="absolute top-1/2 -translate-y-1/2 h-1 w-full bg-divider"></div>
              <div className="flex gap-gut justify-around relative z-1">
                {sequencePhases.map((phase, index) => {
                  const isActive = activePhaseIndex === index
                  return (
                    <div
                      className={cn(
                        'size-12 border rounded-full md:relative transition-all duration-400',
                        isActive
                          ? 'bg-blue border-blue'
                          : 'bg-bg border-divider'
                      )}
                      key={phase._key}
                    >
                      <div
                        className={cn(
                          'text-center absolute left-1/2 -translate-x-1/2 top-0 -translate-y-[2em] text-nowrap transition-all duration-400',
                          !isActive &&
                            'pointer-events-none opacity-0 md:opacity-40 max-md:scale-10'
                        )}
                      >
                        {phase.label}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <SiteGrid
              yGaps={true}
              showGridLines={false}
              looseColSpacing={true}
              className="relative"
            >
              <MediaColumn
                data={section}
                activePhaseIndex={activePhaseIndex}
                activePhaseScrubProgress={activePhaseScrubProgress}
              />
              <div className="col-span-12 landscape:col-span-6 md:col-span-6 grid h-full md:items-center">
                {sequencePhases.map((phase, index) => (
                  <div
                    key={phase._key}
                    className={cn('phase grid-stack', `phase-${index}`)}
                  >
                    <div className="phase-steps">
                      {phase.steps.map((step) => (
                        <div
                          key={step._key}
                          className={cn(
                            'phase-step',
                            step.isHeading ? 'font-bold text-blue mb-em' : ''
                          )}
                        >
                          <PlainTextBlock
                            block={{
                              textContent: step.textContent,
                              textStyle: 'ts-p-dynamic',
                              balanceLines: true,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SiteGrid>
          </div>
        </div>
      </SiteGrid>
    </SiteWidth>
  )
}

function MediaColumn({
  data,
  activePhaseIndex,
  activePhaseScrubProgress,
}: {
  data: PbSequenceHorizontal
  activePhaseIndex: number
  activePhaseScrubProgress: number
}) {
  const { sequencePhases, aspectRatio = { width: 1, height: 1 } } = data
  if (!sequencePhases || sequencePhases.length === 0) {
    return null
  }
  return (
    <div className="col-span-10 landscape:col-span-6 md:col-span-6 grid md:sticky md:top-0">
      {sequencePhases.map((phase, index) => {
        const { media } = phase
        const isActive = activePhaseIndex === index
        const allSteps = phase.steps.map((step) => step.textContent)

        if (!media || media.length === 0) return null
        const mediaItem = media[0]
        return (
          <div
            key={phase._key}
            className={cn(
              'grid-stack corner-container transition-all duration-600',
              activePhaseIndex !== index && 'opacity-0 pointer-events-none'
            )}
          >
            {mediaItem._type === 'mediaLottie' && (
              <Lottie
                lottieFile={mediaItem.lottieFile as unknown as string}
                aspectRatio={aspectRatio}
                disableCorners={mediaItem.disableCorners}
                scrub
                scrubProgress={isActive ? activePhaseScrubProgress : 0}
                className="border border-divider"
                alt={allSteps.join(' ') ?? ''}
              />
            )}
            {mediaItem._type === 'mediaImage' && mediaItem.image && (
              <div
                className={cn(
                  'relative group border border-divider',
                  !mediaItem.disableCorners ? 'corner-sm' : ''
                )}
              >
                <ImageBasic
                  image={mediaItem.image}
                  ratio={aspectRatio.width / aspectRatio.height}
                  sepia={mediaItem.sepiaTone ?? false}
                  alt={allSteps.join(' ') ?? ''}
                />
                <SepiaOverlays sepiaTone={mediaItem.sepiaTone ?? false} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
