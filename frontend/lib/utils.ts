import { SITE_MAX_WIDTH } from '@/components/shared/SiteWidth'
import type { PbColSettings, Size, Start } from '@/sanity.types'
import { PageBuilderData } from '@/types'
import { type ClassValue, clsx } from 'clsx'

// ClassName helper
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

//
// PAGE BUILDER HELPERS
export interface ScreensNum {
  mobile: number
  tablet: number
  desktop: number
}

export interface ScreensStr {
  mobile?: string
  tablet?: string
  desktop?: string
}

export function getOuterSettings(
  rowWidth: 12 | 10 | 8 | 6 = 12
): PbColSettings {
  const desktopStart =
    rowWidth === 12 ? 1 : rowWidth === 10 ? 2 : rowWidth === 8 ? 3 : 4
  return {
    _type: 'pbColSettings',
    size: {
      mobile: 12,
      tablet: 12,
      desktop: rowWidth,
    } satisfies Size,
    start: {
      mobile: 1,
      tablet: 1,
      desktop: desktopStart,
    } satisfies Start,
  }
}

export function getGridClasses(gridSettings: PbColSettings) {
  const { size, start } = gridSettings
  if (!size || !start) {
    return ''
  }
  const sizeM = size.mobile || 12
  const sizeT = size.tablet === 0 || size.tablet === sizeM ? null : size.tablet
  const sizeNow = sizeT || sizeM
  const sizeD =
    size.desktop === 0 || size.desktop === sizeNow ? null : size.desktop

  const startM = start.mobile && start.mobile > 1 ? start.mobile : null
  const startT =
    start.tablet === start.mobile
      ? null
      : start.tablet === 0
        ? 'auto'
        : start.tablet
  const startD =
    start.desktop === start.tablet
      ? null
      : start.desktop === 0
        ? 'auto'
        : start.desktop

  const mobile = `col-span-${sizeM}${startM ? ' col-start-' + startM : ''}`
  const tablet = `${sizeT ? ' md:col-span-' + sizeT : ''}${startT ? ' md:col-start-' + startT : ''}`
  const desktop = `${sizeD ? ' lg:col-span-' + sizeD : ''}${startD ? ' lg:col-start-' + startD : ''}`

  return `${mobile}${tablet}${desktop}`
}

export function getAlignClasses(set: ScreensStr, axis: string) {
  if (set === undefined || set === null) return ''
  const fallback = axis === 'x' ? 'justify-self-start' : 'self-start'
  const { mobile = fallback, tablet = 'inherit', desktop = 'inherit' } = set
  const m = mobile === fallback ? null : mobile
  const t =
    tablet === 'inherit' ? null : tablet === mobile ? null : ' md:' + tablet
  const d =
    desktop === 'inherit' ? null : desktop === tablet ? null : ' lg:' + desktop
  return `${m ? m : ''}${t ? t : ''}${d ? d : ''}`
}

export function getTrueSizes(outer: PbColSettings, inner: PbColSettings) {
  if (!outer.size || !inner.size) {
    return ''
  }
  const oSizeM = outer.size.mobile || 12
  const iSizeM = inner.size.mobile || 12
  const oSizeT = outer.size.tablet === 0 ? oSizeM : outer.size.tablet || 12
  const iSizeT = inner.size.tablet === 0 ? iSizeM : inner.size.tablet || 12
  const oSizeD = outer.size.desktop === 0 ? oSizeT : outer.size.desktop || 12
  const iSizeD = inner.size.desktop === 0 ? iSizeT : inner.size.desktop || 12
  const m = (oSizeM / 12) * (iSizeM / 12) * 100
  const t = (oSizeT / 12) * (iSizeT / 12) * 100
  const d = (oSizeD / 12) * (iSizeD / 12) * 100

  const mVw = m + 'vw'
  const tVw = t === m ? null : '(min-width: 768px) ' + t + 'vw, '
  const dVw =
    d === t ? null : d === m ? null : '(min-width: 1024px) ' + d + 'vw, '
  const maxVw =
    '(min-width: ' +
    SITE_MAX_WIDTH +
    'px) ' +
    SITE_MAX_WIDTH * (d / 100) +
    'px, '

  return `${maxVw}${dVw ? dVw : ''}${tVw ? tVw : ''}${mVw}`
}

export function getImagePosition(position: string) {
  if (position === 'topLeft') return 'left top'
  if (position === 'topCenter') return 'center top'
  if (position === 'topRight') return 'right top'
  if (position === 'centerLeft') return 'left center'
  if (position === 'centerCenter') return 'center center'
  if (position === 'centerRight') return 'right center'
  if (position === 'bottomCenter') return 'center bottom'
  if (position === 'bottomLeft') return 'left bottom'
  if (position === 'bottomRight') return 'right bottom'
}

export function blogDate(date: string, short?: boolean) {
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: short ? 'short' : 'long',
    day: 'numeric',
  })
  return dateFormatter.format(new Date(date))
}

export function getFirstSectionInfo(data: PageBuilderData) {
  if (!data) return { firstIsHero: false, firstPbSectionKey: '' }
  const firstPbSection = data?.pbSections?.find(
    (section) => section.sectionSettings?.enableSection !== false
  )
  const firstPbSectionKey = firstPbSection?._key
  const firstPbSectionType = firstPbSection?._type
  const firstIsHero =
    (firstPbSectionType === 'pbTitleSection' &&
      firstPbSection?.titleMode === 'hero') ||
    firstPbSectionType === 'pbMatrixHero'
  return { firstIsHero, firstPbSectionKey }
}
