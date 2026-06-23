'use client'

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react'
import * as React from 'react'

import { cn } from '@/lib/utils'
import IconArrow from '../icons/IconArrow'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  scrollTo: (index: number) => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}

function Carousel({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  children,
  ...props
}: React.ComponentProps<'div'> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const scrollTo = React.useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api]
  )

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext]
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on('reInit', onSelect)
    api.on('select', onSelect)

    return () => {
      api?.off('select', onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
        scrollPrev,
        scrollNext,
        scrollTo,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({
  classNameViewport,
  className,
  ...props
}: {
  classNameViewport?: string
} & React.ComponentProps<'div'>) {
  const { carouselRef } = useCarousel()

  return (
    <div
      ref={carouselRef}
      data-slot="carousel-content"
      className={classNameViewport ? classNameViewport : 'overflow-hidden'}
    >
      <div className={cn(className ? className : 'flex -ml-4')} {...props} />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        className ? className : 'min-w-0 shrink-0 grow-0 basis-full pl-4'
      )}
      {...props}
    />
  )
}

function CarouselPrevious({
  className,
  ...props
}: React.ComponentProps<'button'>) {
  const { scrollPrev, canScrollPrev } = useCarousel()

  return (
    <button
      data-slot="carousel-previous"
      className={cn('rounded-full touch-manipulation bg-blue', className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <IconArrow className="cn-rtl-flip rotate-180 w-btn-half h-auto" />
      <span className="sr-only">Previous slide</span>
    </button>
  )
}

function CarouselNext({ className, ...props }: React.ComponentProps<'button'>) {
  const { scrollNext, canScrollNext } = useCarousel()

  return (
    <button
      data-slot="carousel-next"
      className={cn('rounded-full touch-manipulation bg-blue', className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <IconArrow className="cn-rtl-flip" />
      <span className="sr-only">Next slide</span>
    </button>
  )
}

function CarouselNav({
  className,
  index,
  children,
  ...props
}: React.ComponentProps<'button'> & { index: number }) {
  const { scrollTo } = useCarousel()

  return (
    <button
      data-slot="carousel-dot"
      className={cn('touch-manipulation', className)}
      onClick={() => scrollTo(index)}
      onMouseEnter={() => scrollTo(index)}
      {...props}
    >
      {children}
    </button>
  )
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNav,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
  type CarouselApi,
}
