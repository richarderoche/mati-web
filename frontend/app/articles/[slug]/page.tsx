import PageBuilder from '@/components/pb/PageBuilder'
import ImageBasic from '@/components/shared/ImageBasic'
import PageWrapper from '@/components/shared/PageWrapper'
import Pill from '@/components/shared/Pill'
import QuoteTranslation from '@/components/shared/QuoteTranslation'
import SiteGrid from '@/components/shared/SiteGrid'
import SiteWidth from '@/components/shared/SiteWidth'
import { blogDate, cn } from '@/lib/utils'
import { sanityFetch } from '@/sanity/lib/live'
import { articleBySlugQuery, slugsByTypeQuery } from '@/sanity/lib/queries'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import type { Metadata, ResolvingMetadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import type { Image } from 'sanity'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { data: article } = await sanityFetch({
    query: articleBySlugQuery,
    params,
    stega: false,
  })

  const ogImage = urlForOpenGraphImage(
    (article?.ogImage ?? article?.coverImage) as Image
  )
  const noIndex = article?.noIndex ?? false

  return {
    title: article?.seoTitle ?? article?.title,
    description:
      (article?.description || article?.introText) ??
      (await parent).description,
    openGraph: {
      images: ogImage
        ? [ogImage]
        : [...((await parent).openGraph?.images ?? [])],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        noimageindex: noIndex,
      },
    },
  }
}

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: slugsByTypeQuery,
    params: { type: 'article' },
    stega: false,
    perspective: 'published',
  })
  const internalArticles = data.filter(
    (article) => article.postType === 'internal'
  )
  return internalArticles
}

export default async function ArticleSlugRoute({ params }: Props) {
  const { data } = await sanityFetch({ query: articleBySlugQuery, params })

  if (!data?._id && !(await draftMode()).isEnabled) {
    notFound()
  }
  // Shared fields
  const { coverImage, coverImageAlt, introText, postType, tags, title } =
    data ?? {}

  const shortHeading = (title?.length || 0) < 80
  const hasTags = tags && tags.length > 0
  let headingTsClass = ''
  let date = '' as string | null

  const isFarmerStory = data?._type === 'farmerStory'
  // Farmer story fields
  if (isFarmerStory) {
    headingTsClass = shortHeading ? 'ts-h2' : 'ts-h3'
  } else {
    const { externalLink, publishDate } = data ?? {}
    if (postType === 'external') {
      if (!externalLink) {
        notFound()
      }
      return redirect(externalLink)
    }
    date = publishDate ? blogDate(publishDate as string) : null
    headingTsClass = shortHeading ? 'ts-h1' : 'ts-h2'
  }

  const headerCellClasses =
    'lined-grid-cell corner-container col-span-12 lg:col-span-6'

  return (
    <PageWrapper className="pt-header">
      {/* Header */}
      <SiteWidth className="pt-gut-200 pb-gut-300">
        <SiteGrid yGaps={false} showGridLines={true} looseColSpacing={true}>
          <div className={cn(headerCellClasses, 'lg:pr-gut')}>
            <div className="ts-h6 flex gap-gut items-center justify-between mb-gut">
              <div className="ts-h6 text-body-subtle flex gap-gut-25 items-center">
                {isFarmerStory ? (
                  <span className="text-body-subtle">Farmer Story</span>
                ) : (
                  hasTags &&
                  tags.map(({ slug, title }) => (
                    <Pill className="bg-bg-subtle" key={slug}>
                      {title}
                    </Pill>
                  ))
                )}
              </div>
              {!isFarmerStory && <div className="text-body-subtle">{date}</div>}
            </div>
            <h1 className={cn(headingTsClass, 'text-balance')}>{title}</h1>
            {isFarmerStory && (
              <div className="mt-gut pl-gut">
                <QuoteTranslation
                  quoteEnglish={data.quoteEnglish}
                  quoteNative={data.quoteNative}
                  nativeAlphabet={data.nativeAlphabet}
                />
              </div>
            )}
          </div>
          <div className={cn(headerCellClasses, 'lg:pl-gut')}>
            <ImageBasic
              image={coverImage as Image}
              alt={coverImageAlt || title}
              sizes="(min-width: 1024px) 40vw, 90vw"
              ratio={isFarmerStory ? 1 : 1.5}
              priority={true}
              className="corner"
            />
          </div>
        </SiteGrid>
      </SiteWidth>
      {/* Intro Text */}
      {introText && (
        <SiteWidth className="pb-gut-300">
          <SiteGrid>
            <div className="col-span-12 lg:col-span-10 lg:col-start-2">
              <div className="ts-h3 text-pretty text-display-subtle">
                {introText}
              </div>
            </div>
          </SiteGrid>
        </SiteWidth>
      )}

      {/* Page Builder */}
      <PageBuilder data={data} firstPbSectionKey={'not-applicable'} />
    </PageWrapper>
  )
}
