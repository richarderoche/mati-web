'use client'

import { PbSections } from '@/sanity.types'
import { PageBuilderData } from '@/types'
import SiteWidth from '../shared/SiteWidth'
import {
  SanityPathSegment,
  SanityVisualEditingPath,
  SanityVisualEditingProvider,
  useSanityDataAttribute,
} from './SanityVisualEditingContext'
import SectionBlogThumbnails, {
  SectionBlogThumbnailsBlock,
} from './SectionBlogThumbnails'
import SectionCarouselTabbed from './SectionCarouselTabbed'
import SectionDetailedList from './SectionDetailedList'
import SectionGrid from './SectionGrid'
import SectionJobs from './SectionJobs'
import SectionMatrixHero from './SectionMatrixHero'
import SectionSequenceHorizontal from './SectionSequenceHorizontal'
import SectionSequenceVertical from './SectionSequenceVertical'
import SectionSingleColumn from './SectionSingleColumn'
import SectionSpotlight from './SectionSpotlight'
import SectionStaggerColumns from './SectionStaggerColumns'
import SectionTimeline from './SectionTimeline'
import SectionTitleHero from './SectionTitleHero'
import SectionTwoUpGrid from './SectionTwoUpGrid'

export interface PageBuilderContentProps {
  data: PageBuilderData
  baseUrl: string
  firstPbSectionKey: string
}

function PageBuilderSections({
  pbSections,
  firstPbSectionKey,
}: {
  pbSections: PbSections
  firstPbSectionKey: string
}) {
  const { getDataAttribute } = useSanityDataAttribute()
  if (!pbSections?.length) return null

  return (
    <div className="flex flex-col">
      {pbSections.map((section) => {
        const { _key, sectionSettings } = section
        const {
          enableSection = true,
          sectionId,
          marginTop,
          marginBottom,
        } = sectionSettings || {}

        if (!enableSection) return null

        const sectionPath: SanityPathSegment[] = ['pbSections', { _key }]

        return (
          <section
            id={sectionId ? sectionId : 'section-' + _key}
            key={_key}
            className="pt-gut first:pt-0"
            data-sanity={getDataAttribute(sectionPath)}
            data-key={_key}
          >
            <div
              style={{
                paddingTop: marginTop
                  ? `calc(var(--gut) * ${marginTop})`
                  : undefined,
                paddingBottom: marginBottom
                  ? `calc(var(--gut) * ${marginBottom})`
                  : undefined,
              }}
            >
              <SanityVisualEditingPath path={[...sectionPath]}>
                {section._type === 'pbGrid' && (
                  <SectionGrid section={section} />
                )}
                {section._type === 'pbSingleColumn' && (
                  <SectionSingleColumn section={section} sectionKey={_key} />
                )}
                {section._type === 'pbTwoUpGrid' && (
                  <SectionTwoUpGrid section={section} sectionKey={_key} />
                )}
                {section._type === 'pbTitleSection' && (
                  <SectionTitleHero
                    section={section}
                    isFirst={_key === firstPbSectionKey}
                  />
                )}
                {section._type === 'pbJobs' && (
                  <SectionJobs section={section} />
                )}
                {section._type === 'pbDetailedList' && (
                  <SectionDetailedList section={section} />
                )}
                {section._type === 'pbBlogThumbnails' && (
                  <SectionBlogThumbnails
                    section={section as unknown as SectionBlogThumbnailsBlock}
                  />
                )}
                {section._type === 'pbSequenceHorizontal' && (
                  <SectionSequenceHorizontal section={section} />
                )}
                {section._type === 'pbSequenceVertical' && (
                  <SectionSequenceVertical section={section} />
                )}
                {section._type === 'pbTimeline' && (
                  <SectionTimeline section={section} />
                )}
                {section._type === 'pbStaggerColumns' && (
                  <SectionStaggerColumns section={section} />
                )}
                {section._type === 'pbCarouselTabbed' && (
                  <SectionCarouselTabbed section={section} />
                )}
                {section._type === 'pbSpotlight' && (
                  <SectionSpotlight section={section} />
                )}
                {section._type === 'pbMatrixHero' && (
                  <SectionMatrixHero section={section} />
                )}
                {section._type === 'pbPlaceholder' && (
                  <SiteWidth>
                    <div className="flex flex-col gap-gut min-h-[66vh] bg-bg-subtle rounded-lg items-center justify-center">
                      <h3 className="ts-h6 text-center text-body-subtle">
                        Placeholder
                      </h3>
                      <h3 className="ts-h5 text-center">
                        {section.placeholderTitle}
                      </h3>
                    </div>
                  </SiteWidth>
                )}
              </SanityVisualEditingPath>
            </div>
          </section>
        )
      })}
    </div>
  )
}

export default function PageBuilderContent({
  data,
  baseUrl,
  firstPbSectionKey,
}: PageBuilderContentProps) {
  const { pbSections = [] } = data ?? {}
  const documentId = data?._id ?? null
  const documentType = data?._type ?? null

  return (
    <SanityVisualEditingProvider
      documentId={documentId}
      documentType={documentType}
      baseUrl={baseUrl}
    >
      <PageBuilderSections
        pbSections={pbSections as PbSections}
        firstPbSectionKey={firstPbSectionKey}
      />
    </SanityVisualEditingProvider>
  )
}
