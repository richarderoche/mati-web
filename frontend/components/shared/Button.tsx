import Link from 'next/link'

import { cn } from '@/lib/utils'
import { resolveHref } from '@/sanity/lib/utils'
import { NavItem } from '@/types'
import IconArrow from '../icons/IconArrow'

interface ButtonProps {
  text?: string
  path?: string
  navItem?: NavItem
  style?: 'main' | 'alt' | 'secondary'
  className?: string
  download?: boolean
  onClick?: () => void
}

export default function Button(props: ButtonProps) {
  const {
    text,
    path,
    navItem,
    style = 'main',
    className,
    download = false,
    onClick,
  } = props

  let href: string | undefined = ''
  let buttonText: string | undefined = ''

  if (navItem) {
    const { page, title, url } = navItem
    href = page ? resolveHref(page.type, page.slug) : url
    buttonText = title || page?.title || ''
  } else {
    if (!text || !path) return null
    href = path || ''
    buttonText = text || ''
  }

  const isExternal = href?.startsWith('http')

  return (
    <Link
      href={href ?? '/'}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={cn(
        'cursor-pointer',
        style === 'main'
          ? 'text-bg rounded-full flex w-fit items-center transition-colors whitespace-nowrap ts-h5 px-btn-half h-btn relative group'
          : style === 'alt'
            ? 'block ts-p-sm pt-[.5em] relative group'
            : 'hover:text-blue',
        className
      )}
      download={download}
      onClick={onClick}
    >
      {style === 'main' && <ArrowButton buttonText={buttonText} />}
      {style === 'alt' && <OverlineButton buttonText={buttonText} />}
    </Link>
  )
}

export const ArrowButton = ({ buttonText }: { buttonText: string }) => {
  return (
    <>
      <div className="absolute right-0 top-0 -translate-x-arrow-shift group-hover:translate-x-0 spring-btn size-btn flex items-center justify-center rounded-full bg-blue scale-10 group-hover:scale-100">
        <IconArrow className="w-btn-half h-auto" />
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-full group-hover:w-btn-shift spring-btn rounded-full bg-blue"></div>
      <div className="center-caps px-[.7em] group-hover:-translate-x-btn-half spring-btn">
        {buttonText}
      </div>
    </>
  )
}

export const OverlineButton = ({ buttonText }: { buttonText: string }) => {
  return (
    <>
      <div className="absolute left-0 top-0 h-1 w-full bg-divider"></div>
      <div className="absolute left-0 top-0 h-1 w-0 group-hover:w-full spring-btn bg-blue"></div>
      <span className="text-body-subtle pointer-coarse:text-body group-hover:text-body spring-btn">
        {buttonText}
      </span>
    </>
  )
}
