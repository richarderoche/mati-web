import { blogDate, cn } from '@/lib/utils'
import {
  AllArticlesQueryResult,
  ArticleBySlugQueryResult,
} from '@/sanity.types'
import { resolveHref } from '@/sanity/lib/utils'
import Link from 'next/link'
import { Image } from 'sanity'
import Button from '../shared/Button'
import ImageBasic from '../shared/ImageBasic'
import Pill from '../shared/Pill'
import QuoteTranslation from '../shared/QuoteTranslation'
import SepiaOverlays from '../shared/SepiaOverlays'
import SiteGrid from '../shared/SiteGrid'

export default function BlogThumbnail({
  post,
  thumbnailSize,
  priority = false,
}: {
  post: AllArticlesQueryResult[number] | ArticleBySlugQueryResult
  thumbnailSize: 'small' | 'medium' | 'large'
  priority?: boolean
}) {
  const { title, slug, coverImage, coverImageAlt, introText, postType, tags } =
    post ?? {}
  const href = resolveHref('article', slug)
  const isFarmerStory = post?._type === 'farmerStory'
  const isQuoteOnly = isFarmerStory && postType === 'quoteOnly'
  const isLarge = thumbnailSize === 'large'
  let link = ''
  let date = '' as string | null

  if (post?._type === 'article' && postType === 'external') {
    link = post?.externalLink ?? ''
  } else {
    link = href as string
  }

  if (!isFarmerStory) {
    if (postType === 'external') {
      link = post?.externalLink ?? ''
    }
    const { publishDate } = post ?? {}
    date = publishDate ? blogDate(publishDate as string) : null
  } else {
    link = href as string
  }

  if (!link) {
    return null
  }

  if (isLarge || thumbnailSize === 'medium') {
    const headerCellClasses = 'lined-grid-cell corner-container'

    const shortHeading = (title?.length || 0) < 80
    const headingTsClass = shortHeading ? 'ts-h3' : 'ts-h4-serif'
    return (
      <SiteGrid
        yGaps={isLarge ? false : true}
        showGridLines={isLarge ? true : false}
        looseColSpacing={true}
        className={
          isLarge ? '' : 'border-t border-divider pt-gut-200 pb-gut group/order'
        }
      >
        <div
          className={cn(
            headerCellClasses,
            isLarge
              ? 'col-span-12 lg:pr-gut lg:col-span-6'
              : 'col-span-8 md:col-span-4 lg:col-span-5'
          )}
        >
          <ImageBasic
            image={coverImage as Image}
            alt={coverImageAlt || title}
            sizes={cn(
              isLarge
                ? '(min-width: 1024px) 40vw, 90vw'
                : '(min-width: 1024px) 35vw, (min-width: 768px) 30vw, 70vw'
            )}
            ratio={isFarmerStory ? 1 : 1.5}
            priority={priority}
            className={'corner'}
          />
        </div>
        <div
          className={cn(
            headerCellClasses,
            isLarge
              ? 'col-span-12 lg:pl-gut lg:col-span-6 justify-between'
              : 'col-span-12 md:col-span-8 lg:col-span-7 group-even/order:md:-order-1',
            'flex flex-col gap-gut'
          )}
        >
          <div className={isLarge ? 'grow' : ''}>
            {(isLarge || !isFarmerStory) && (
              <div className="ts-h6 flex gap-gut items-center justify-between mb-gut-50">
                {isFarmerStory && (
                  <span className="text-body-subtle">Farmer Story</span>
                )}
                {tags && tags.length > 0 && (
                  <div className="ts-h6 text-body-subtle flex gap-gut-25 items-center">
                    {tags.map(({ slug, title }) => (
                      <Pill className="bg-bg-subtle" key={slug}>
                        {title}
                      </Pill>
                    ))}
                  </div>
                )}
                {!isFarmerStory && (
                  <div className="text-body-subtle">{date}</div>
                )}
              </div>
            )}
            <h1
              className={cn(
                isLarge ? headingTsClass : 'ts-h4-serif',
                'text-balance'
              )}
            >
              {title}
            </h1>
            {isFarmerStory ? (
              <div className="mt-gut pl-gut">
                <QuoteTranslation
                  quoteEnglish={post.quoteEnglish}
                  quoteNative={post.quoteNative}
                  nativeAlphabet={post.nativeAlphabet}
                />
              </div>
            ) : (
              <p className="text-display-subtle text-pretty mt-gut-50">
                {introText}
              </p>
            )}
          </div>
          {!isQuoteOnly && <Button path={link} text="Read More" />}
        </div>
      </SiteGrid>
    )
  } else {
    if (!link || isQuoteOnly) {
      return null
    }
    return (
      <div className="corner-container h-full text-pretty">
        <Link
          href={link}
          target={postType === 'external' ? '_blank' : undefined}
          rel={postType === 'external' ? 'noopener noreferrer' : undefined}
          className="flex flex-col group corner border border-divider h-full hover:scale-102 transition-all duration-300"
        >
          <div className="relative">
            <ImageBasic
              image={coverImage as Image}
              alt={coverImageAlt || title}
              sizes="(min-width: 1024px) 40vw, 90vw"
              ratio={16 / 9}
              sepia={true}
            />
            <SepiaOverlays sepiaTone={true} />
            <div className="absolute top-0 left-0 w-full ts-h6 flex gap-gut items-center justify-between mb-gut-50 p-gut-50 z-10 pointer-events-none">
              {tags && tags.length > 0 && (
                <div className="ts-h6 text-body-subtle flex gap-gut-25 items-center">
                  {tags.map(({ slug, title }) => (
                    <Pill className="bg-blue text-bg" key={slug}>
                      {title}
                    </Pill>
                  ))}
                </div>
              )}
              <div>
                <Pill className="bg-bg-subtle">{date}</Pill>
              </div>
            </div>
          </div>
          <div className="px-gut-50 py-gut-75">
            <h3 className="">{title}</h3>
            {introText && (
              <p className="ts-p-sm text-display-subtle mt-gut-50">
                {introText}
              </p>
            )}
          </div>
        </Link>
      </div>
    )
  }
}
