import { studioUrl } from '@/sanity/lib/api'
import { PageBuilderData } from '@/types'
import PageBuilderContent from './PageBuilderContent'

export interface PageBuilderProps {
  data: PageBuilderData
  firstPbSectionKey: string
}

export default function PageBuilder({
  data,
  firstPbSectionKey,
}: PageBuilderProps) {
  const { pbSections } = data ?? {}
  if (!pbSections || pbSections.length === 0) return null
  return (
    <PageBuilderContent
      data={data}
      baseUrl={studioUrl}
      firstPbSectionKey={firstPbSectionKey}
    />
  )
}
