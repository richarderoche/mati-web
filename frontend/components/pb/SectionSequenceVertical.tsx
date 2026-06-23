import { PbColSettings, PbSequenceVertical } from '@/sanity.types'

import { cn, getOuterSettings, getTrueSizes } from '@/lib/utils'
import { PbBlocksQueryResult } from '@/types'
import Card from '../shared/Card'
import Revealer from '../shared/Revealer'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'
import PbBlocks from './PbBlocks'
import { useSanityDataAttribute } from './SanityVisualEditingContext'
import { getColSizes } from './SectionTwoUpGrid'
import VerticalStep from './VerticalStep'

export default function SectionSequenceVertical({
  section,
}: {
  section: PbSequenceVertical
}) {
  const { stickyColumn, sequenceSteps, columnProportions } = section
  const stickyColumnBlocks = stickyColumn?.pbBlocks || []
  const sequenceStepsBlocks = sequenceSteps || []
  // Skip if no blocks yet
  if (!stickyColumnBlocks.length && !sequenceStepsBlocks.length) {
    return null
  }

  return (
    <SiteWidth>
      <SiteGrid
        yGaps={true}
        showGridLines={false}
        looseColSpacing={true}
        className="md:landscape:min-h-screen relative"
      >
        {stickyColumn && stickyColumnBlocks.length > 0 && (
          <StickyColumn
            stickyColumn={stickyColumn}
            columnProportions={columnProportions || '50-50'}
          />
        )}
        {sequenceSteps && sequenceStepsBlocks.length > 0 && (
          <div
            className={cn(
              'flex flex-col gap-gut col-span-12 md:landscape:pt-[25vh]',
              columnProportions === '50-50'
                ? 'md:col-span-6'
                : columnProportions === '60-40'
                  ? 'md:col-span-5'
                  : 'md:col-span-7'
            )}
          >
            {sequenceStepsBlocks.map((step, index) => (
              <VerticalStep
                key={step._key}
                step={step}
                isLast={index === sequenceStepsBlocks.length - 1}
                index={index}
              />
            ))}
          </div>
        )}
      </SiteGrid>
    </SiteWidth>
  )
}

function StickyColumn({
  stickyColumn,
  columnProportions,
}: {
  stickyColumn: PbSequenceVertical['stickyColumn']
  columnProportions: PbSequenceVertical['columnProportions']
}) {
  const { pbBlocks, revealEffect, spaceBetweenBlocks, cardMode } =
    stickyColumn || {}

  const { getDataAttribute } = useSanityDataAttribute()

  if (!pbBlocks || pbBlocks.length === 0) {
    return null
  }
  // Prep attributes
  const colSizes = getColSizes(columnProportions || '50-50')
  const stickyColumnSettings = {
    _type: 'pbColSettings',
    size: {
      mobile: 12,
      tablet: colSizes.colOne,
      desktop: colSizes.colOne,
    },
    start: {
      mobile: 0,
      tablet: 0,
      desktop: 0,
    },
  } satisfies PbColSettings

  const colBlocks = (
    <PbBlocks
      columnBlocks={pbBlocks as PbBlocksQueryResult}
      trueSizes={getTrueSizes(getOuterSettings(12), stickyColumnSettings)}
      spaceBetweenBlocks={spaceBetweenBlocks || 'gap-gut'}
    />
  )

  const colInner = cardMode ? <Card>{colBlocks}</Card> : colBlocks

  return (
    <div
      className={cn(
        'flex flex-col gap-gut col-span-12 md:landscape:justify-center md:landscape:h-screen md:landscape:sticky md:landscape:top-0',
        columnProportions === '50-50'
          ? 'md:col-span-6'
          : columnProportions === '60-40'
            ? 'md:col-span-7'
            : 'md:col-span-5'
      )}
    >
      <Revealer
        className="corner-container lined-grid-cell"
        data-sanity={getDataAttribute()}
        direction={revealEffect}
      >
        {colInner}
      </Revealer>
    </div>
  )
}
