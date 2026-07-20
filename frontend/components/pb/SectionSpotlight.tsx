import { cn, getGridClasses, getOuterSettings } from '@/lib/utils'

import { PbSpotlight } from '@/sanity.types'
import { PortableTextBlock } from 'next-sanity'
import { CustomPortableText } from '../shared/CustomPortableText'
import ImageBasic from '../shared/ImageBasic'
import Revealer from '../shared/Revealer'
import RichTextWrap from '../shared/RichTextWrap'
import SepiaOverlays from '../shared/SepiaOverlays'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth, { SITE_MAX_WIDTH } from '../shared/SiteWidth'
import { ButtonBlock } from './ButtonBlock'

export default function SectionSpotlight({
  section,
}: {
  section: PbSpotlight
}) {
  const {
    rowWidth,
    displayMode,
    image,
    imageAltText,
    priority,
    sepiaTone,
    richText,
    ctaCaption,
    ctaButton,
    showBackdropImage,
    cardPosition,
  } = section

  // Prep attributes
  const outerSettings = getOuterSettings(rowWidth)
  const outerClasses = outerSettings ? getGridClasses(outerSettings) : ''
  const hasCardContent = ctaCaption || ctaButton || richText
  const isDiptych = displayMode === 'diptych'
  const hasBackdropImage = showBackdropImage && isDiptych && image
  const hasBannerImage = displayMode === 'banner' && image
  const cardIsTop = cardPosition === 'topLeft' || cardPosition === 'topRight'
  const cardIsLeft = cardPosition === 'bottomLeft' || cardPosition === 'topLeft'
  const siteMaxWidth = SITE_MAX_WIDTH

  return (
    <div className={cn('relative', hasBackdropImage && ' max-md:py-gut-200')}>
      {hasBackdropImage && (
        <div
          className="absolute inset-0 md:hidden pointer-events-none"
          aria-hidden="true"
        >
          <ImageBasic
            image={image}
            alt={imageAltText}
            sizes="100vw"
            priority={priority ?? false}
            sepia={true}
            mode="cover"
            fitTo="manual"
            ratio={0.5}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-backdrop backdrop-blur-xs"></div>
        </div>
      )}
      <SiteWidth
        className={hasBackdropImage ? 'max-md:relative max-md:z-1' : ''}
      >
        <SiteGrid>
          <Revealer className={cn(outerClasses, 'corner-container')}>
            {hasBackdropImage && (
              <div
                className="absolute inset-0 max-md:hidden corner pointer-events-none"
                aria-hidden="true"
              >
                <ImageBasic
                  image={image}
                  alt={imageAltText}
                  sizes="90vw"
                  priority={priority ?? false}
                  sepia={true}
                  mode="cover"
                  fitTo="manual"
                  ratio={2}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-backdrop backdrop-blur-xs"></div>
              </div>
            )}
            <div
              className={cn(
                'grid grid-cols-1 md:gap-gut',
                hasBannerImage ? 'max-md:bg-bg-subtle corner' : '',
                isDiptych ? 'lg:grid-cols-2 corner' : '',
                hasBackdropImage
                  ? 'max-md:bg-bg md:relative md:z-1 md:p-gut'
                  : isDiptych
                    ? 'max-md:bg-bg-subtle'
                    : ''
              )}
            >
              {hasBannerImage && (
                <div className="corner-container">
                  <div className="">
                    <ImageBasic
                      image={image}
                      alt={imageAltText}
                      sizes={`(min-width: ${siteMaxWidth}) 1476px, 90vw`}
                      ratio={2}
                      priority={priority ?? false}
                      sepia={sepiaTone ?? false}
                    />
                    <SepiaOverlays sepiaTone={sepiaTone ?? false} />
                  </div>
                </div>
              )}
              {image && isDiptych && (
                <div className="corner-container max-md:px-gut max-md:pt-gut">
                  <div
                    className={cn(
                      'relative group',
                      hasBackdropImage ? 'corner-nested' : 'corner'
                    )}
                  >
                    <ImageBasic
                      image={image}
                      alt={imageAltText}
                      sizes={`(min-width: ${siteMaxWidth}) 693px, (min-width: 1024px) 45vw, 90vw`}
                      ratio={1}
                      priority={priority ?? false}
                      sepia={sepiaTone ?? false}
                    />
                    <SepiaOverlays sepiaTone={sepiaTone ?? false} />
                  </div>
                </div>
              )}
              {hasCardContent && (
                <div
                  className={cn(
                    'corner-container',
                    !isDiptych ? 'lg:absolute lg:w-half-minus-gut' : 'h-full',
                    cardIsTop ? 'lg:top-gut' : 'lg:bottom-gut',
                    cardIsLeft ? 'lg:left-gut' : 'lg:right-gut'
                  )}
                >
                  <div
                    className={cn(
                      'p-gut h-full flex flex-col justify-between gap-gut',
                      hasBackdropImage
                        ? 'bg-bg corner-nested drop-shadow'
                        : hasBannerImage
                          ? 'bg-bg-subtle corner-nested'
                          : 'bg-bg-subtle corner'
                    )}
                  >
                    {richText && (
                      <RichTextWrap
                        className={cn(
                          richText.bodyTextSize || 'ts-p-md',
                          richText.color
                        )}
                      >
                        <CustomPortableText
                          value={richText.textContent as PortableTextBlock[]}
                        />
                      </RichTextWrap>
                    )}
                    {(ctaCaption || ctaButton) && (
                      <div className="flex gap-gut items-end justify-between">
                        {ctaCaption && (
                          <p className="ts-p-md text-balance text-body-subtle">
                            {ctaCaption}
                          </p>
                        )}
                        {ctaButton && (
                          <ButtonBlock block={ctaButton} onClick={null} />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Revealer>
        </SiteGrid>
      </SiteWidth>
    </div>
  )
}
