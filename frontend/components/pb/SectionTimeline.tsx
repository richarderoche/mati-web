import { cn, getGridClasses, getOuterSettings } from '@/lib/utils'

import { PbTimeline } from '@/sanity.types'
import Revealer from '../shared/Revealer'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'
import TimelineRow from './TimelineRow'

export default function SectionTimeline({ section }: { section: PbTimeline }) {
  const { rowWidth, title, events } = section
  const totalEvents = events?.length || 0
  // Skip if no events yet
  if (!events || totalEvents === 0) {
    return null
  }
  // Prep attributes
  const outerSettings = getOuterSettings(rowWidth)
  const outerClasses = outerSettings ? getGridClasses(outerSettings) : ''

  return (
    <SiteWidth>
      <SiteGrid>
        <div className={cn(outerClasses)}>
          {title && (
            <Revealer className="pt-gut-300 mb-gut-200" direction="fade-up">
              <h2 className="ts-h1 md:text-center">{title}</h2>
            </Revealer>
          )}
          <div>
            <TimelineRow />
            {events.map((event, i) => (
              <TimelineRow
                key={event._key}
                row={event}
                isLast={i === events.length - 1}
              />
            ))}
          </div>
        </div>
      </SiteGrid>
    </SiteWidth>
  )
}
