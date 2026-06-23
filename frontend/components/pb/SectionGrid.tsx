import {
  cn,
  getAlignClasses,
  getGridClasses,
  getOuterSettings,
  getTrueSizes,
} from '@/lib/utils'
import { PbColSettings, PbGrid } from '@/sanity.types'

import { PbBlocksQueryResult } from '@/types'
import { AccordionSection } from '../shared/AccordionSection'
import Card from '../shared/Card'
import Revealer from '../shared/Revealer'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'
import PbBlocks from './PbBlocks'
import {
  SanityVisualEditingPath,
  useSanityDataAttribute,
} from './SanityVisualEditingContext'

export default function SectionGrid({ section }: { section: PbGrid }) {
  const { rowWidth = 12, showGridLines, columns } = section
  const { path: sectionPath } = useSanityDataAttribute()
  // Skip if no columns yet
  if (!columns || columns.length === 0) {
    return null
  }
  // Prep attributes
  const outerSettings = getOuterSettings(rowWidth)
  const outerClasses = outerSettings ? getGridClasses(outerSettings) : ''
  const looseColSpacing = rowWidth > 8 && columns.length < 3

  return (
    <SiteWidth>
      <SiteGrid>
        <div className={outerClasses}>
          <SiteGrid
            yGaps={!showGridLines}
            showGridLines={showGridLines}
            looseColSpacing={looseColSpacing}
          >
            {columns.map((col) => (
              <SanityVisualEditingPath
                key={col._key}
                path={[...sectionPath, 'columns', { _key: col._key }]}
              >
                <GridCol
                  col={col}
                  outerSettings={outerSettings}
                  cardMode={col.cardMode}
                  blockWidths={col.blockWidths}
                />
              </SanityVisualEditingPath>
            ))}
          </SiteGrid>
        </div>
      </SiteGrid>
    </SiteWidth>
  )
}

export interface GridColProps {
  col: NonNullable<PbGrid['columns']>[number]
  outerSettings: PbColSettings
  cardMode?: boolean
  sticky?: boolean
  blockWidths?: {
    mobile?: string
    tablet?: string
    desktop?: string
  }
}

export function GridCol({
  col,
  outerSettings,
  cardMode = false,
  blockWidths,
}: GridColProps) {
  const {
    _key,
    columnSettings,
    pbBlocks,
    yAlignment,
    revealEffect,
    spaceBetweenBlocks,
  } = col
  const { getDataAttribute } = useSanityDataAttribute()

  // Skip if no blocks yet
  if (!pbBlocks || pbBlocks.length === 0) {
    return null
  }
  // Prep attributes
  const { accordionMode = false, accordionTitle = 'More' } =
    columnSettings || {}
  const colClasses = columnSettings ? getGridClasses(columnSettings) : ''
  const yClasses = yAlignment ? getAlignClasses(yAlignment, 'y') : ''
  const trueSizes =
    outerSettings && columnSettings
      ? getTrueSizes(outerSettings, columnSettings)
      : ''
  const innerId = `col-${_key}`

  const colBlocks = (
    <PbBlocks
      columnBlocks={pbBlocks as PbBlocksQueryResult}
      trueSizes={trueSizes}
      spaceBetweenBlocks={spaceBetweenBlocks || 'gap-gut'}
      blockWidths={blockWidths}
    />
  )

  const colInner = cardMode ? <Card>{colBlocks}</Card> : colBlocks

  return (
    <Revealer
      className={cn(colClasses, yClasses, 'corner-container lined-grid-cell')}
      data-sanity={getDataAttribute()}
      direction={revealEffect}
    >
      {accordionMode && pbBlocks.length > 0 && (
        <AccordionSection accordionTitle={accordionTitle} innerId={innerId}>
          {colInner}
        </AccordionSection>
      )}

      {!accordionMode && pbBlocks.length > 0 && colInner}
    </Revealer>
  )
}
