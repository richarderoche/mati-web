'use client'
import { usePrefersReducedMotion } from '@/lib/hooks'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { MatrixItem } from '@/sanity.types'
import { useGSAP } from '@gsap/react'
import { FocusTrap } from 'focus-trap-react'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import IconNav from '../icons/IconNav'
import ImageBasic from '../shared/ImageBasic'
import SiteWidth, { SITE_MAX_WIDTH } from '../shared/SiteWidth'

export default function MatrixOverlay({
  content,
  isOverlayOpen,
  setIsOverlayOpen,
}: {
  content: MatrixItem | null
  isOverlayOpen: boolean
  setIsOverlayOpen: (value: boolean) => void
}) {
  const { title, image, imageCrop, details } = content || {}
  const imageAssetRef = image?.asset?._ref
  const setPauseLenis = useStore((state) => state.setPauseLenis)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [loadedAssetRef, setLoadedAssetRef] = useState<string | null>(null)
  const fullImageReady = Boolean(
    imageAssetRef && loadedAssetRef === imageAssetRef
  )
  const handleClose = () => {
    setPauseLenis(false)
    setIsOverlayOpen(false)
  }
  const prefersReducedMotion = usePrefersReducedMotion()
  const overlayImgSizes = `(min-width: ${SITE_MAX_WIDTH}px) ${SITE_MAX_WIDTH * 0.45}px,(min-width: 1024px) 45vw, 90vw`

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPauseLenis(false)
        setIsOverlayOpen(false)
      }
    }
    if (isOverlayOpen) {
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOverlayOpen, setIsOverlayOpen, setPauseLenis])

  useGSAP(
    () => {
      if (!overlayRef.current || prefersReducedMotion) return
      if (isOverlayOpen) {
        gsap.set(overlayRef.current, { display: 'block' })
        gsap.set('.overlay-image', { opacity: 0, scale: 0.9 })
        gsap.set('.overlay-details', { opacity: 0, scale: 0.9 })
        gsap.set('.detail-divider', { opacity: 0, scaleX: 0 })
        gsap.set('.detail-content', { opacity: 0, y: 10 })
        gsap.set('.overlay-inner', {
          scaleX: 0,
        })
        gsap
          .timeline({ overwrite: true })
          .to(overlayRef.current, {
            opacity: 1,
            duration: 0.4,
            ease: 'expo.out',
          })
          .to(
            '.overlay-inner',
            {
              scaleX: 1,
              duration: 0.4,
              ease: 'power2.out',
            },
            '-=0.1'
          )
          .to(
            '.overlay-image',
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: 'power2.out',
            },
            '-=0.1'
          )
          .to(
            '.overlay-details',
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: 'power2.out',
            },
            '-=0.5'
          )
          .to(
            '.detail-divider',
            {
              opacity: 1,
              scaleX: 1,
              duration: 0.4,
              ease: 'power2.out',
              stagger: 0.03,
            },
            '-=0.3'
          )
          .to(
            '.detail-content',
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              stagger: 0.06,
            },
            '-=0.3'
          )
      } else {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'expo.in',
          onComplete: (el) => {
            if (!el) return
            gsap.set(el, { display: 'none' })
          },
        })
      }
    },
    { scope: overlayRef, dependencies: [isOverlayOpen, prefersReducedMotion] }
  )

  if (!content) return null
  return (
    <FocusTrap active={isOverlayOpen}>
      <div
        ref={overlayRef}
        className={cn('fixed inset-0 z-9999 opacity-0')}
        inert={!isOverlayOpen}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <button className="absolute inset-0 bg-bg/80" onClick={handleClose}>
          <span className="sr-only">Close</span>
        </button>
        <div className="absolute top-gut md:top-gut-200 bottom-gut-200 w-full z-2 pointer-events-none">
          <SiteWidth className="h-full corner-container">
            <div className="overlay-inner h-full bg-bg-subtle/80 backdrop-blur pointer-events-auto corner p-gut">
              <div className="flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-1 gap-gut h-full">
                <div className="overlay-image">
                  {image && (
                    <ImageBasic
                      key={imageAssetRef}
                      image={image}
                      alt={title || ''}
                      sizes={overlayImgSizes}
                      ratio={imageCrop || 0}
                      className={cn(
                        'w-full h-auto max-h-full object-cover corner-nested',
                        fullImageReady ? 'opacity-100' : 'opacity-0'
                      )}
                      maxDimension={500}
                      quality={65}
                      onLoad={() => {
                        if (imageAssetRef) setLoadedAssetRef(imageAssetRef)
                      }}
                    />
                  )}
                </div>
                <div className="overlay-details corner-nested bg-bg p-gut flex flex-col gap-gut max-lg:grow max-lg:-order-1">
                  <div className="flex justify-between items-center">
                    <h2 className="ts-p-xl text-body-subtle">{title}</h2>
                    <button
                      onClick={handleClose}
                      aria-label="Close Overlay"
                      className="text-blue"
                    >
                      <IconNav
                        className="w-[34px] h-[20px]"
                        isHeaderNavOpen={true}
                      />
                    </button>
                  </div>
                  {details && (
                    <div
                      className="flex flex-col gap-gut-50 overflow-auto touch-manipulation no-scrollbar"
                      data-lenis-prevent
                    >
                      {details.location && (
                        <DetailRow label="Location" value={details.location} />
                      )}
                      {details.date && (
                        <DetailRow label="Date" value={details.date} />
                      )}
                      {details.description && (
                        <DetailRow
                          label="Description"
                          value={details.description}
                        />
                      )}
                      {details.customDetails &&
                        details.customDetails.map((detail) => (
                          <DetailRow
                            key={detail._key}
                            label={detail.label}
                            value={detail.value}
                          />
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SiteWidth>
        </div>
      </div>
    </FocusTrap>
  )
}

const DetailRow = ({ label, value }: { label?: string; value?: string }) => {
  if (!label || !value) return null
  const isLongText = value.length > 200
  return (
    <>
      <div className="grid grid-cols-3 gap-gut">
        <div className="detail-divider col-span-1 max-md:col-span-3 h-1 bg-divider origin-left"></div>
        <div className="detail-divider col-span-2 h-1 bg-divider origin-left max-md:hidden"></div>
      </div>

      <div className="grid grid-cols-3 gap-gut max-md:gap-gut-50 items-baseline pb-gut-25">
        <h3 className="detail-content ts-h6 text-body-subtle col-span-1 max-md:col-span-3">
          {label}
        </h3>
        <p
          className={cn(
            'detail-content col-span-2 text-balance max-md:col-span-3',
            isLongText ? 'ts-p-sm' : 'ts-p-md'
          )}
        >
          {value}
        </p>
      </div>
    </>
  )
}
