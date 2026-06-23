import { cn } from '@/lib/utils'

export default function BlueOverlays({
  blueTone,
  className,
}: {
  blueTone: boolean
  className?: string
}) {
  if (!blueTone) return null
  return (
    <>
      <div
        className={cn(
          'blue-overlay blue-overlay-multiply group-hover:opacity-0',
          className
        )}
      />
      <div
        className={cn(
          'blue-overlay blue-overlay-screen group-hover:opacity-0',
          className
        )}
      />
    </>
  )
}
