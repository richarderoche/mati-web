'use client'
import { cn } from '@/lib/utils'
import { useLayoutEffect, useRef, useState } from 'react'

interface SiteGridProps {
  children: React.ReactNode
  className?: string
  yGaps?: boolean
  showGridLines?: boolean
  looseColSpacing?: boolean
  yAlignment?: string
}

const NEIGHBOR_CLASSES = ['neighbor-left', 'neighbor-right'] as const

function updateNeighborClasses(gridEl: HTMLElement) {
  const gridRect = gridEl.getBoundingClientRect()
  const children = Array.from(gridEl.children) as HTMLElement[]
  const yValues = children.map((el) => {
    const rect = el.getBoundingClientRect()
    return Math.round(rect.top - gridRect.top)
  })

  children.forEach((el, i) => {
    NEIGHBOR_CLASSES.forEach((c) => el.classList.remove(c))
    const y = yValues[i]
    if (i > 0 && yValues[i - 1] === y) el.classList.add('neighbor-left')
    if (i < children.length - 1 && yValues[i + 1] === y)
      el.classList.add('neighbor-right')
  })
}

export default function SiteGrid({
  children,
  className,
  yGaps = false,
  showGridLines = false,
  looseColSpacing = false,
  yAlignment,
  ...props
}: SiteGridProps & React.ComponentProps<'div'>) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [neighborsReady, setNeighborsReady] = useState(false)
  const gapClasses =
    looseColSpacing && yGaps
      ? 'gap-gut lg:gap-gut-200'
      : yGaps
        ? 'gap-gut'
        : looseColSpacing
          ? 'gap-x-gut lg:gap-x-gut-200'
          : 'gap-x-gut'

  useLayoutEffect(() => {
    if (!showGridLines) return

    const gridEl = gridRef.current
    if (!gridEl) return

    updateNeighborClasses(gridEl)
    queueMicrotask(() => setNeighborsReady(true))

    const resizeObserver = new ResizeObserver(() => {
      updateNeighborClasses(gridEl)
    })
    resizeObserver.observe(gridEl)

    const handleResize = () => updateNeighborClasses(gridEl)
    window.addEventListener('resize', handleResize)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', handleResize)
    }
  }, [showGridLines, children])

  return (
    <div
      ref={gridRef}
      className={cn(
        'grid grid-cols-12',
        showGridLines
          ? 'border-y border-divider bg-divider lined-grid gap-1'
          : gapClasses,
        showGridLines && !neighborsReady && 'lined-grid-pending',
        yAlignment,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
