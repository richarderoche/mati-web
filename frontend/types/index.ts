// Manual types (not created by Sanity typegen)
// Only reusable types should be here
// Put one-off types in the component file

import {
  ArticleBySlugQueryResult,
  HomePageQueryResult,
  PagesBySlugQueryResult,
} from '@/sanity.types'

export interface NavPage {
  type: string
  slug?: string | null
  title?: string | null
}

export interface NavItem {
  _key: string
  _type: string
  url?: string
  title?: string
  page?: NavPage | null
}

// pbSections is a union (e.g. pbGrid | pbTitleSection); only pbGrid has columns
type PbGridSection = Extract<
  NonNullable<NonNullable<PagesBySlugQueryResult>['pbSections']>[number],
  { _type: 'pbGrid' }
>
export type PbBlocksQueryResult = NonNullable<
  NonNullable<PbGridSection['columns']>[number]['pbBlocks']
>

export type PageBuilderData =
  | ArticleBySlugQueryResult
  | PagesBySlugQueryResult
  | HomePageQueryResult
  | undefined
