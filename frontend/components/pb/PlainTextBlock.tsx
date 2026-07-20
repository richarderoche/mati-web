import { cn } from '@/lib/utils'

export function PlainTextBlock({ block, useH1 = false }) {
  return (
    <div
      className={cn(
        block.textStyle || 'ts-p-md',
        block.color,
        block.balanceLines ? 'text-balance' : 'text-pretty'
      )}
    >
      {useH1 ? <h1>{block.textContent}</h1> : <>{block.textContent}</>}
    </div>
  )
}
