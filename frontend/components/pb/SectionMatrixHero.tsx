'use client'

import { MatrixItem, PbMatrixHero } from '@/sanity.types'
import { getImageDimensions } from '@sanity/asset-utils'

import { useViewport } from '@/lib/real-viewport'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'
import IconLogoWordmark from '../icons/IconLogoWordmark'
import ImageBasic from '../shared/ImageBasic'
import { Marqy } from '../shared/Marqy'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth, { SITE_MAX_WIDTH } from '../shared/SiteWidth'
import { ButtonBlock } from './ButtonBlock'
import MatrixOverlay from './MatrixOverlay'
import { PlainTextBlock } from './PlainTextBlock'

export default function SectionMatrixHero({
  section,
}: {
  section: PbMatrixHero
}) {
  const { textBlocks, ctaButtons, showLogo } = section?.textCTAContent || {}
  const { matrixColumns } = section
  const hasTextBlocks = textBlocks && textBlocks?.length > 0
  const hasCTAButtons = ctaButtons && ctaButtons?.length > 0
  const hasMatrixColumns = matrixColumns && matrixColumns?.length > 0
  const colCount = matrixColumns?.length || 0
  const dvh = useViewport((state) => state.dvh)
  const heroRef = useRef<HTMLImageElement>(null)
  const [itemHovered, setItemHovered] = useState<boolean | null>(false)
  const [overlayContent, setOverlayContent] = useState<MatrixItem | null>(null)
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const setPauseLenis = useStore((state) => state.setPauseLenis)
  const itemImgPercent = 1 / colCount
  const itemImgSizes = `(min-width: ${SITE_MAX_WIDTH}px) ${SITE_MAX_WIDTH * 0.5 * itemImgPercent}px,(min-width: 1024px) ${itemImgPercent * 50}vw, ${itemImgPercent * 95}vw`

  const handleItemClick = (item: MatrixItem) => {
    setOverlayContent(item)
    setIsOverlayOpen(true)
    setPauseLenis(true)
  }

  return (
    <div ref={heroRef}>
      <SiteWidth>
        <SiteGrid
          looseColSpacing
          style={{ height: dvh ? `${dvh * 100}px` : '100dvh' }}
          className="grid-rows-3 lg:grid-rows-1"
        >
          {/* Text/CTA Content */}
          <div className="col-span-12 lg:col-span-6 pt-header flex flex-col justify-center gap-gut max-lg:row-start-2 lg:row-start-1 max-lg:row-span-2">
            {(hasTextBlocks || hasCTAButtons) && (
              <div className="flex flex-col gap-gut-75 grow justify-center lg:pr-gut-200">
                {hasTextBlocks &&
                  textBlocks?.map((block, i) => (
                    <PlainTextBlock
                      key={block._key}
                      block={block}
                      useH1={i === 0}
                    />
                  ))}
                {hasCTAButtons && (
                  <div className="flex flex-wrap gap-gut-50 mt-gut-25">
                    {ctaButtons?.map((button) => (
                      <ButtonBlock
                        key={button._key}
                        block={button}
                        onClick={null}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
            {showLogo && (
              <div
                className="pb-gut"
                style={{ height: dvh ? `${dvh * 15}px` : '15dvh' }}
              >
                <IconLogoWordmark className="h-full w-auto" />
              </div>
            )}
          </div>

          {/* Matrix Columns */}
          <div
            className={cn(
              'col-span-12 lg:col-span-6 grid relative max-lg:row-span-1',
              `grid-cols-${colCount || 1}`,
              itemHovered && 'matrix-item-hovered'
            )}
            onMouseEnter={() => {
              setItemHovered(true)
            }}
            onMouseLeave={() => {
              setItemHovered(false)
            }}
          >
            {hasMatrixColumns &&
              matrixColumns?.map((column, i) => (
                <Marqy
                  key={column._key}
                  speed={column.speed / 20}
                  direction={i % 2 === 0 ? 'up' : 'down'}
                  pauseOnHover={true}
                >
                  <div className="flex flex-col corner-container">
                    {column.matrixItems?.map((item) => {
                      const { image, imageCrop } = item
                      if (!image?.asset?._ref) return null
                      const { width, height } = getImageDimensions(image.asset)
                      const aspectRatio = imageCrop || width / height
                      return (
                        <button
                          key={item._key}
                          className="hover:scale-122 transition-all duration-2000 hover:duration-75 ease-out p-[9cqw] relative hover:z-1"
                          onClick={() => {
                            handleItemClick(item)
                          }}
                          type="button"
                          aria-label={item.title}
                        >
                          <div
                            className="corner-sm group relative w-full"
                            style={{ aspectRatio }}
                          >
                            {item.image && (
                              <ImageBasic
                                image={image}
                                sizes={itemImgSizes}
                                ratio={imageCrop || 0}
                                className="grayscale"
                                priority={true}
                                maxDimension={SITE_MAX_WIDTH / 2 / colCount / 2}
                                quality={60}
                              />
                            )}
                            <div className="sepia-overlay sepia-overlay-multiply" />
                            <div className="sepia-overlay sepia-overlay-screen" />
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </Marqy>
              ))}
          </div>
        </SiteGrid>
      </SiteWidth>
      <MatrixOverlay
        content={overlayContent}
        isOverlayOpen={isOverlayOpen}
        setIsOverlayOpen={setIsOverlayOpen}
      />
    </div>
  )
}
