import { getPublishedId } from 'sanity'
import type { PbColSettings } from '../../frontend/sanity.types'

/** Slug types that share the /articles/[slug] route — slugs must be unique across these. */
export const ARTICLE_ROUTE_SLUG_TYPES = ['article', 'farmerStory'] as const

/**
 * isUnique for slug fields on documents that share the /articles/[slug] route.
 * Ensures the slug is unique across both article and farmerStory.
 */
export async function isUniqueArticleRouteSlug(
  value: string | { current?: string | null } | null,
  context: {
    document?: { _id?: string }
    getClient: (options: { apiVersion: string }) => {
      fetch: (
        query: string,
        params: Record<string, unknown>
      ) => Promise<unknown>
    }
  }
): Promise<boolean> {
  const slug = typeof value === 'string' ? value : (value?.current ?? '')
  const id = context.document?._id
  if (!slug.trim()) return true
  const client = context.getClient({ apiVersion: '2025-01-01' })
  const publishedId = id ? getPublishedId(id) : ''
  const draftId = publishedId ? `drafts.${publishedId}` : ''
  const params = { slug, publishedId, draftId, types: ARTICLE_ROUTE_SLUG_TYPES }
  const query = `!defined(*[_type in $types && slug.current == $slug && _id != $publishedId && _id != $draftId][0]._id)`
  const isUnique = await client.fetch(query, params)
  return Boolean(isUnique)
}

//
// SCHEMA HELPERS

export function getGridSettings(gridSettings: PbColSettings) {
  const { size, start } = gridSettings
  if (!start || !size) {
    return ''
  }
  const startT = start.tablet === 0 ? start.mobile : start.tablet
  const sizeT = size.tablet === 0 ? size.mobile : size.tablet
  const startD = start.desktop === 0 ? startT : start.desktop
  const sizeD = size.desktop === 0 ? sizeT : size.desktop

  const mobile = `(M) ${gridLine(start.mobile, size.mobile)}`
  const tablet = `(T) ${gridLine(startT, sizeT)}`
  const desktop = `(D) ${gridLine(startD, sizeD)}`

  return `${mobile}, ${tablet}, ${desktop}`
}

function gridLine(start: number, size: number) {
  if (start > 1) {
    const end = start + size - 1
    return `Cols ${start}-${end}`
  }
  const percent = parseFloat(((size / 12) * 100).toFixed(2))
  return `${percent}%`
}

export const getTypeTitles = (types: string[]) => {
  const typeNames = types.map((type) => {
    switch (type) {
      case 'pbBlockText':
        return 'Rich Text'
      case 'pbBlockPlainText':
        return 'Plain Text'
      case 'pbBlockImage':
        return 'Image'
      case 'pbBlockVideoEmbed':
        return 'Video Embed'
      case 'pbBlockDivider':
        return 'Divider/Spacer'
      case 'pbBlockEmail':
        return 'Email'
      case 'pbBlockSocial':
        return 'Social'
      case 'pbBlockMapbox':
        return 'Mapbox'
      case 'pbBlockButton':
        return 'Button'
      case 'pbBlockPublicationsList':
        return 'Publications List'
      case 'pbBlockMarquee':
        return 'Marquee'
      default:
        return null
    }
  })

  return typeNames.join(', ')
}

export const getRowWidthTitle = (rowWidth: number) => {
  if (rowWidth === 12) {
    return 'Full'
  }
  if (rowWidth === 10) {
    return 'Medium'
  }
  if (rowWidth === 8) {
    return 'Small'
  }
  return 'Extra Small'
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export { capitalize }
