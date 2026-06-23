'use client'
import { cn } from '@/lib/utils'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import type { DotLottie } from '@lottiefiles/dotlottie-web'
import { useEffect, useState } from 'react'

export default function Lottie({
  lottieFile,
  aspectRatio = { width: 1, height: 1 },
  disableCorners = false,
  autoplay = true,
  isPlaying,
  scrub = false,
  scrubProgress = 0,
  className = '',
  alt = '',
}: {
  lottieFile?: string
  aspectRatio?: { width: number; height: number }
  disableCorners?: boolean
  autoplay?: boolean
  /** When `autoplay` is false, toggles playback. Ignored when `autoplay` is true or `scrub` is true. */
  isPlaying?: boolean
  /** When true, maps `scrubProgress` (0–1) to the animation frame instead of playing/looping. */
  scrub?: boolean
  /** Normalized scroll progress for the active window; only used when `scrub` is true. */
  scrubProgress?: number
  className?: string
  alt?: string
}) {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null)

  const dotLottieRefCallback = (instance: DotLottie | null) => {
    setDotLottie(instance)
  }

  useEffect(() => {
    if (scrub || autoplay || !dotLottie) return
    const playing = isPlaying ?? false
    if (!playing) {
      dotLottie.pause()
      return
    }

    const startPlayback = () => {
      dotLottie.play()
    }

    if (dotLottie.isLoaded) {
      startPlayback()
      return
    }

    const onLoad = () => {
      startPlayback()
    }
    dotLottie.addEventListener('load', onLoad)
    return () => {
      dotLottie.removeEventListener('load', onLoad)
    }
  }, [scrub, autoplay, isPlaying, dotLottie])

  useEffect(() => {
    if (!scrub || !dotLottie) return

    const progress = Math.min(1, Math.max(0, scrubProgress))

    const applyScrubFrame = () => {
      if (!dotLottie.isLoaded) return
      dotLottie.pause()
      const maxFrame = Math.max(0, dotLottie.totalFrames - 1)
      dotLottie.setFrame(progress * maxFrame)
    }

    applyScrubFrame()
    if (dotLottie.isLoaded) return

    const onLoad = () => applyScrubFrame()
    dotLottie.addEventListener('load', onLoad)
    return () => {
      dotLottie.removeEventListener('load', onLoad)
    }
  }, [scrub, scrubProgress, dotLottie])

  if (!lottieFile) return null
  return (
    <div
      className="corner-container w-full h-auto"
      style={{ aspectRatio: `${aspectRatio.width}/${aspectRatio.height}` }}
    >
      <div
        className={cn(
          'w-full h-full',
          !disableCorners ? 'corner-sm' : '',
          className
        )}
      >
        <DotLottieReact
          src={lottieFile}
          renderConfig={{
            autoResize: true,
          }}
          loop={!scrub}
          autoplay={scrub ? false : autoplay}
          dotLottieRefCallback={dotLottieRefCallback}
          aria-label={alt}
        />
      </div>
    </div>
  )
}
