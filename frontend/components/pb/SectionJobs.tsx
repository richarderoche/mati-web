import { getGridClasses, getOuterSettings } from '@/lib/utils'
import { PbJobs } from '@/sanity.types'

import IconPin from '../icons/IconPin'
import Pill from '../shared/Pill'
import Revealer from '../shared/Revealer'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'
import { ButtonBlock } from './PbBlocks'

export default function SectionJobs({ section }: { section: PbJobs }) {
  const { rowWidth, jobs } = section
  // Skip if no jobs yet
  if (!jobs || jobs.length === 0) {
    return null
  }
  // Prep attributes
  const outerSettings = getOuterSettings(rowWidth)
  const outerClasses = outerSettings ? getGridClasses(outerSettings) : ''

  return (
    <SiteWidth>
      <SiteGrid>
        <div className={outerClasses}>
          {jobs.map(
            ({ _key, jobTitle, jobCategory, jobLocation, jobButtons }) => (
              <Revealer
                className="border-t border-divider last:border-b py-gut"
                key={_key}
              >
                <div className="flex gap-gut ts-h4">
                  <h3 className="grow">{jobTitle}</h3>
                  {jobButtons && jobButtons.length > 0 && (
                    <div className="flex flex-col gap-gut-25 items-end pt-[.165em]">
                      {jobButtons?.map((button) => (
                        <div key={button._key}>
                          <ButtonBlock block={button} onClick={null} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {(jobCategory || jobLocation) && (
                  <div className="mt-gut-50 flex gap-gut ts-h6">
                    {jobCategory && (
                      <div className="min-w-[15em]">
                        <Pill className="bg-bg-subtle">{jobCategory}</Pill>
                      </div>
                    )}
                    {jobLocation && (
                      <div className="flex gap-gut-25 ">
                        <IconPin className="text-divider h-[2em] w-auto scale-75" />
                        <p className="text-body-subtle text-balance pt-[.5em]">
                          {jobLocation}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </Revealer>
            )
          )}
        </div>
      </SiteGrid>
    </SiteWidth>
  )
}
