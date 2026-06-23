import { cn } from '@/lib/utils'

export default function Pill({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex w-fit items-center rounded-full ts-h6 px-em py-[.5em]',
        className
      )}
    >
      {children}
    </div>
  )
}
