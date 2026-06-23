import { cn, getGridClasses, getOuterSettings } from '@/lib/utils'

import { PbDetailedList } from '@/sanity.types'
import { PortableTextBlock } from 'next-sanity'
import { CustomPortableText } from '../shared/CustomPortableText'
import ImageBasic from '../shared/ImageBasic'
import Revealer from '../shared/Revealer'
import RichTextWrap from '../shared/RichTextWrap'
import SepiaOverlays from '../shared/SepiaOverlays'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'

export default function SectionDetailedList({
  section,
}: {
  section: PbDetailedList
}) {
  const { rowWidth, rows, showNumbers, showImage, imageSettings } = section
  const { imageCrop, sepiaTone, disableCorners } = imageSettings || {}
  // Skip if no rows yet
  if (!rows || rows.length === 0) {
    return null
  }
  // Prep attributes
  const outerSettings = getOuterSettings(rowWidth)
  const outerClasses = outerSettings ? getGridClasses(outerSettings) : ''
  const cellClasses = 'border-t border-divider pt-gut'

  return (
    <SiteWidth>
      <SiteGrid>
        <div className={cn(outerClasses, 'flex flex-col gap-gut text-balance')}>
          {rows.map(({ _key, heading, description, image, alt }, index) => (
            <Revealer
              className={cn(
                'grid gap-x-gut gap-y-gut-50 group',
                rowWidth === 10
                  ? 'grid-cols-12 lg:grid-cols-10'
                  : 'grid-cols-12'
              )}
              key={_key}
            >
              {showNumbers && (
                <div className={cn(cellClasses, 'col-span-2 lg:col-span-1')}>
                  <p className="ts-h5 text-blue tabular-nums">
                    {LeadingZero(index)}
                  </p>
                </div>
              )}
              {heading && (
                <div
                  className={cn(
                    cellClasses,
                    showNumbers ? 'col-span-10' : 'col-span-12',
                    (rowWidth === 10 && !showNumbers && !showImage) ||
                      (rowWidth === 12 && showNumbers && !showImage)
                      ? 'lg:col-span-5'
                      : rowWidth === 12 && !showNumbers && !showImage
                        ? 'lg:col-span-6'
                        : 'lg:col-span-4'
                  )}
                >
                  <h3 className="ts-p-xl">{heading}</h3>
                </div>
              )}
              {description && (
                <div
                  className={cn(
                    cellClasses,
                    'text-body-subtle max-lg:border-t-0 max-lg:pt-0',
                    showNumbers
                      ? 'col-span-10 max-lg:col-start-3'
                      : 'col-span-12 md:col-span-8',
                    (rowWidth === 12 && showImage && showNumbers) ||
                      (rowWidth === 10 && showImage && !showNumbers)
                      ? 'lg:col-span-4'
                      : rowWidth === 12 && !showImage
                        ? 'lg:col-span-6'
                        : 'lg:col-span-5'
                  )}
                >
                  <RichTextWrap>
                    <CustomPortableText
                      value={description as PortableTextBlock[]}
                    />
                  </RichTextWrap>
                </div>
              )}
              {showImage && image && (
                <div
                  className={cn(
                    'corner-container',
                    showNumbers
                      ? 'col-span-10 max-lg:col-start-3 max-lg:mt-gut-50'
                      : 'col-span-12 max-md:mt-gut-50 md:col-span-4',
                    rowWidth === 10 && !showNumbers
                      ? 'lg:col-span-2'
                      : rowWidth === 10 && showNumbers
                        ? 'lg:col-span-5 lg:col-start-6 lg:mt-gut-25'
                        : 'lg:col-span-3'
                  )}
                >
                  <div
                    className={cn(!disableCorners ? 'corner' : '', 'relative')}
                  >
                    <ImageBasic
                      image={image}
                      alt={alt}
                      ratio={imageCrop || 0}
                      sepia={sepiaTone || false}
                    />
                    <SepiaOverlays sepiaTone={sepiaTone || false} />
                  </div>
                </div>
              )}
            </Revealer>
          ))}
        </div>
      </SiteGrid>
    </SiteWidth>
  )
}

export function LeadingZero(index: number) {
  return index < 9 ? `0${index + 1}` : index + 1
}
