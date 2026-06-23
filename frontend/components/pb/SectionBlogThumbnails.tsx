import { cn, getGridClasses, getOuterSettings } from '@/lib/utils'
import { AllArticlesQueryResult, PagesBySlugQueryResult } from '@/sanity.types'

import { AllPosts } from '../blog/AllPosts'
import BlogThumbnail from '../blog/BlogThumbnail'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'

/** Section type for pbBlogThumbnails from the page query (with expanded blogPosts) */
export type SectionBlogThumbnailsBlock = Extract<
  NonNullable<NonNullable<PagesBySlugQueryResult>['pbSections']>[number],
  { _type: 'pbBlogThumbnails' }
>

export default function SectionBlogThumbnails({
  section,
}: {
  section: SectionBlogThumbnailsBlock
}) {
  const { rowWidth, selectionFormat, thumbnailSize, blogPosts } = section
  // Skip if manual selection and no blog posts yet
  if (selectionFormat === 'manual' && (!blogPosts || blogPosts.length === 0)) {
    return null
  }
  // Prep attributes
  const outerSettings = getOuterSettings(rowWidth)
  const outerClasses = outerSettings ? getGridClasses(outerSettings) : ''
  const totalPosts = blogPosts?.length || 0
  const gridCols =
    totalPosts === 1
      ? 'grid-cols-1'
      : totalPosts === 2
        ? 'grid-cols-1 md:grid-cols-2'
        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'

  return (
    <SiteWidth>
      <SiteGrid>
        <div className={outerClasses}>
          {selectionFormat === 'manual' && (
            <div
              className={cn(
                thumbnailSize === 'small' ? gridCols : 'grid-cols-1',
                'grid gap-gut'
              )}
            >
              {blogPosts?.map((post, i) => (
                <BlogThumbnail
                  key={post.slug + i}
                  post={post}
                  thumbnailSize={thumbnailSize as 'small' | 'large'}
                />
              ))}
            </div>
          )}

          {selectionFormat === 'all' && (
            <AllPosts blogPosts={blogPosts as AllArticlesQueryResult} />
          )}
        </div>
      </SiteGrid>
    </SiteWidth>
  )
}
