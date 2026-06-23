import { cn } from '@/lib/utils'

export default function SepiaOverlays({
  sepiaTone,
  className,
}: {
  sepiaTone: boolean
  className?: string
}) {
  if (!sepiaTone) return null
  return (
    <>
      <div
        className={cn(
          'sepia-overlay sepia-overlay-multiply group-hover:opacity-0',
          className
        )}
      />
      <div
        className={cn(
          'sepia-overlay sepia-overlay-screen group-hover:opacity-0',
          className
        )}
      />
    </>
  )
}
