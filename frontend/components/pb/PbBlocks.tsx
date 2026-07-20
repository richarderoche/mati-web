'use client'

import { cn } from '@/lib/utils'
import { PbBlocksQueryResult } from '@/types'
import { PortableTextBlock } from 'next-sanity'
import type { Image as SanityImageType } from 'sanity'
import CopyButton from '../shared/CopyButton'
import { CustomPortableText } from '../shared/CustomPortableText'
import Divider from '../shared/Divider'
import ImageBasic from '../shared/ImageBasic'
import Lottie from '../shared/Lottie'
import RichTextWrap from '../shared/RichTextWrap'
import SepiaOverlays from '../shared/SepiaOverlays'
import SocialIconList from '../shared/SocialIconList'
import VideoEmbed from '../shared/VideoEmbed'
import { ButtonBlock } from './ButtonBlock'
import MapboxBlock from './MapboxBlock'
import MarqueeBlock from './MarqueeBlock'
import { PlainTextBlock } from './PlainTextBlock'
import { PublicationsListBlock } from './PublicationsListBlock'
import { useSanityDataAttribute } from './SanityVisualEditingContext'
import { ratioPadding } from './ratioPadding'

export interface PbBlocksProps {
  columnBlocks: PbBlocksQueryResult
  trueSizes: string
  spaceBetweenBlocks: string
  blockWidths?: {
    mobile?: string
    tablet?: string
    desktop?: string
  }
}

export default function PbBlocks({
  columnBlocks,
  trueSizes,
  spaceBetweenBlocks,
  blockWidths = {
    mobile: 'grid-cols-1',
    tablet: 'md:grid-cols-1',
    desktop: 'lg:grid-cols-1',
  },
}: PbBlocksProps) {
  const { getDataAttribute } = useSanityDataAttribute()
  return (
    <div
      className={cn(
        'column-blocks grid h-full content-start',
        blockWidths.mobile,
        blockWidths.tablet,
        blockWidths.desktop,
        spaceBetweenBlocks
      )}
    >
      {columnBlocks &&
        columnBlocks.map((block) => {
          const { _key, _type } = block
          const blockDataSanity = getDataAttribute(['pbBlocks', { _key }])

          switch (_type) {
            // Rich Text Block
            case 'pbBlockText':
              return (
                <RichTextWrap
                  key={_key}
                  data-sanity={blockDataSanity}
                  className={cn(block.bodyTextSize || 'ts-p-md', block.color)}
                >
                  <CustomPortableText
                    value={block.textContent as PortableTextBlock[]}
                  />
                </RichTextWrap>
              )

            // Plain Text Block
            case 'pbBlockPlainText':
              return (
                <div key={_key} data-sanity={blockDataSanity}>
                  <PlainTextBlock block={block} />
                </div>
              )

            // Image Block
            case 'pbBlockImage':
              return (
                <div key={_key} data-sanity={blockDataSanity}>
                  <div
                    className={cn(
                      'relative group',
                      !block.disableCorners ? 'corner' : ''
                    )}
                    style={{
                      width: block.imageWidth ? block.imageWidth + '%' : 'auto',
                    }}
                  >
                    <ImageBasic
                      image={block.image as SanityImageType}
                      alt={block.alt}
                      sizes={trueSizes}
                      ratio={block.imageCrop || 0}
                      priority={block.priority ?? false}
                      sepia={block.sepiaTone ?? false}
                    />
                    <SepiaOverlays sepiaTone={block.sepiaTone ?? false} />
                  </div>
                  {block.caption && (
                    <div className="ts-p-sm text-pretty text-body-subtle mt-gut-50">
                      {block.caption}
                    </div>
                  )}
                </div>
              )

            // Video Block
            case 'pbBlockVideoEmbed':
              return (
                <div key={_key} data-sanity={blockDataSanity}>
                  <div
                    className="relative"
                    style={{
                      paddingTop: ratioPadding(
                        block.videoAspectRatio &&
                          block.videoAspectRatio.width &&
                          block.videoAspectRatio.height
                          ? {
                              width: block.videoAspectRatio.width,
                              height: block.videoAspectRatio.height,
                            }
                          : { width: 16, height: 9 }
                      ),
                    }}
                  >
                    <VideoEmbed url={block.videoEmbedUrl} />
                  </div>
                </div>
              )

            // Mapbox Block
            case 'pbBlockMapbox':
              return (
                <div key={_key} data-sanity={blockDataSanity}>
                  <MapboxBlock block={block} />
                </div>
              )

            // Button Block
            case 'pbBlockButton':
              return (
                <div key={_key} data-sanity={blockDataSanity}>
                  <ButtonBlock block={block} onClick={null} />
                </div>
              )

            // Divider Block
            case 'pbBlockDivider':
              return (
                <Divider
                  key={_key}
                  data-sanity={blockDataSanity}
                  data-ignore-neighbor-padding
                  showOnMobile={block.showOnMobile ?? true}
                  showOnTablet={block.showOnTablet ?? true}
                  showOnDesktop={block.showOnDesktop ?? true}
                  showDividerLine={block.showDividerLine ?? true}
                  size={block.size ?? 1}
                />
              )

            // Scrolling Marquee Block
            case 'pbBlockMarquee':
              return (
                <div key={_key} data-sanity={blockDataSanity}>
                  <MarqueeBlock block={block} />
                </div>
              )

            // Lottie Block
            case 'pbBlockLottie':
              return (
                <div key={_key} data-sanity={blockDataSanity}>
                  {block.lottieFile && (
                    <Lottie
                      lottieFile={block.lottieFile}
                      aspectRatio={block.aspectRatio}
                      alt={block.alt}
                    />
                  )}
                </div>
              )

            // Email Block
            case 'pbBlockEmail':
              return (
                <div key={_key} data-sanity={blockDataSanity}>
                  {block.emailLabel && (
                    <p className="ts-p-sm text-body-subtle mb-gut-25">
                      {block.emailLabel}
                    </p>
                  )}
                  <div className="flex gap-gut-25 md:gap-gut-50 items-center">
                    <p>{block.emailAddress}</p>
                    <CopyButton email={block.emailAddress} />
                  </div>
                </div>
              )

            // Social Block
            case 'pbBlockSocial':
              return (
                <div key={_key} data-sanity={blockDataSanity}>
                  <SocialIconList socialIcons={block.socialIcons ?? []} />
                </div>
              )

            // Publications List Block
            case 'pbBlockPublicationsList':
              return (
                <div key={_key} data-sanity={blockDataSanity}>
                  {block.heading && (
                    <h3 className="ts-h5 text-blue mb-gut">{block.heading}</h3>
                  )}
                  {block.publications && (
                    <div className="flex flex-col corner-container">
                      {block.publications.map((publication) => (
                        <PublicationsListBlock
                          key={publication._key}
                          publication={publication}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )

            default:
              return null
          }
        })}
    </div>
  )
}
