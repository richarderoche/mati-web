'use client'

import { cn } from '@/lib/utils'
import { AllArticlesQueryResult } from '@/sanity.types'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import IconArrow from '../icons/IconArrow'
import Revealer from '../shared/Revealer'
import BlogThumbnail from './BlogThumbnail'

const POSTS_PER_PAGE = 6

export const AllPosts = ({
  blogPosts,
}: {
  blogPosts: AllArticlesQueryResult
}) => {
  return (
    <Suspense fallback={<AllPostsPage blogPosts={blogPosts} page={1} />}>
      <AllPostsWithParams blogPosts={blogPosts} />
    </Suspense>
  )
}

function AllPostsWithParams({
  blogPosts,
}: {
  blogPosts: AllArticlesQueryResult
}) {
  const searchParams = useSearchParams()
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10) || 1)
  return <AllPostsPage blogPosts={blogPosts} page={page} />
}

function AllPostsPage({
  blogPosts,
  page,
}: {
  blogPosts: AllArticlesQueryResult
  page: number
}) {
  const featuredPost = blogPosts[0]
  const restStart = 1 + (page - 1) * POSTS_PER_PAGE
  const restPosts = blogPosts.slice(restStart, restStart + POSTS_PER_PAGE)

  const lastIndexOnPage = page === 1 ? 6 : page * POSTS_PER_PAGE
  const hasNext = blogPosts.length > lastIndexOnPage
  const hasPrev = page > 1
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE)

  return (
    <div>
      {/* Featured post */}
      {featuredPost && (
        <div data-featured className="mt-gut mb-gut-200">
          <BlogThumbnail
            key={featuredPost.slug}
            post={featuredPost}
            thumbnailSize="large"
            priority={true}
          />
        </div>
      )}

      {/* Other posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gut">
        {restPosts.map((post: AllArticlesQueryResult[number]) => (
          <Revealer key={post.slug} direction="fade-only">
            <BlogThumbnail post={post} thumbnailSize="small" />
          </Revealer>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-gut-200 flex justify-center items-center gap-gut">
        <PrevNextButton
          href={`?page=${page - 1}`}
          direction="previous"
          disabled={!hasPrev}
        />
        <div className="flex gap-gut-50 items-center tabular-nums">
          <span className="ts-p-lg">{page}</span>
          <span className="ts-h6 text-body-subtle">of</span>
          <span className="ts-p-lg text-body-subtle">{totalPages}</span>
        </div>
        <PrevNextButton
          href={`?page=${page + 1}`}
          direction="next"
          disabled={!hasNext}
        />
      </div>
    </div>
  )
}

const PrevNextButton = ({
  href,
  direction,
  disabled,
}: {
  href: string
  direction: 'previous' | 'next'
  disabled: boolean
}) => {
  const buttonClasses = cn(
    disabled
      ? 'bg-divider'
      : 'bg-blue hover:scale-110 transition-all duration-300',
    direction === 'previous' ? 'rotate-180' : '',
    'size-btn flex items-center justify-center rounded-full'
  )
  const icon = <IconArrow className="w-btn-half h-auto" />
  return (
    <>
      {!disabled && (
        <Link
          href={href}
          scroll={false}
          className={buttonClasses}
          aria-label={direction === 'previous' ? 'Previous page' : 'Next page'}
        >
          {icon}
        </Link>
      )}
      {disabled && (
        <div className={buttonClasses} aria-hidden>
          {icon}
        </div>
      )}
    </>
  )
}
