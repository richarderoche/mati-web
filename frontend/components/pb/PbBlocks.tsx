'use client'

import { cn } from '@/lib/utils'
import { NavItem, PbBlocksQueryResult } from '@/types'
import { PortableTextBlock } from 'next-sanity'
import Link from 'next/link'
import type { Image as SanityImageType } from 'sanity'
import Button from '../shared/Button'
import CopyButton from '../shared/CopyButton'
import { CustomPortableText } from '../shared/CustomPortableText'
import Divider from '../shared/Divider'
import ImageBasic from '../shared/ImageBasic'
import Lottie from '../shared/Lottie'
import Pill from '../shared/Pill'
import RichTextWrap from '../shared/RichTextWrap'
import SepiaOverlays from '../shared/SepiaOverlays'
import SocialIconList from '../shared/SocialIconList'
import VideoEmbed from '../shared/VideoEmbed'
import MapboxBlock from './MapboxBlock'
import MarqueeBlock from './MarqueeBlock'
import { useSanityDataAttribute } from './SanityVisualEditingContext'

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

export function PlainTextBlock({ block, useH1 = false }) {
  return (
    <div
      className={cn(
        block.textStyle || 'ts-p-md',
        block.color,
        block.balanceLines ? 'text-balance' : 'text-pretty'
      )}
    >
      {useH1 ? <h1>{block.textContent}</h1> : <>{block.textContent}</>}
    </div>
  )
}

export function ButtonBlock({ block, onClick }) {
  return (
    <>
      {block.linkType === 'sitePage' && (
        <Button navItem={block.sitePage as NavItem} onClick={onClick} />
      )}
      {block.linkType === 'externalLink' && (
        <Button navItem={block.externalLink as NavItem} onClick={onClick} />
      )}
      {block.linkType === 'file' && (
        <Button
          path={block.fileLink?.url || ''}
          text={block.fileLink?.buttonText || 'Download'}
          download
          onClick={onClick}
        />
      )}
    </>
  )
}

export function PublicationsListBlock({ publication }) {
  const {
    title,
    description,
    authors,
    dateLabel,
    linkType,
    url,
    fileUrl,
    linkText,
  } = publication
  const href =
    linkType === 'externalLink' ? url : linkType === 'file' ? fileUrl : null
  if (!href) return null
  const label = linkText || href
  return (
    <div className="border-t border-divider py-gut text-pretty">
      <Link
        href={href}
        target={linkType === 'externalLink' ? '_blank' : undefined}
        rel={linkType === 'externalLink' ? 'noopener noreferrer' : undefined}
        className="block theme-vars-only"
        onMouseEnter={(e) => {
          if (window.matchMedia('(pointer: fine)').matches) {
            e.currentTarget.classList.add('light-theme')
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.classList.remove('light-theme')
        }}
      >
        <div className="flex flex-col gap-gut-50 corner-sm p-gut-50 bg-bg-subtle text-body-subtle transition-colors">
          <div className="flex flex-wrap gap-x-gut-25 gap-y-gut-50 items-center justify-between mb-gut-25">
            {dateLabel && (
              <Pill className="border border-divider">{dateLabel}</Pill>
            )}
            <p className="ts-p-xs">{label}</p>
          </div>
          <h4 className="ts-h4-serif text-body transition-colors">{title}</h4>
          {description && <p className="ts-p-xs">{description}</p>}
          {authors && (
            <p className="ts-p-xs">
              {authors.map((author, i) => (
                <span key={author._key} className="font-bold">
                  {i > 0 && <span>, </span>}
                  <span className={author.highlight && 'text-blue'}>
                    {author.name}
                  </span>
                </span>
              ))}
            </p>
          )}
        </div>
      </Link>
    </div>
  )
}

export function ratioPadding({
  width,
  height,
}: {
  width: number
  height: number
}) {
  return (height / width) * 100 + '%'
}
