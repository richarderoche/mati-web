'use client'

import dynamic from 'next/dynamic'
import { DraftModeToast } from './DraftModeToast'

const VisualEditing = dynamic(
  () => import('next-sanity/visual-editing').then((mod) => mod.VisualEditing),
  { ssr: false }
)

export function DraftModeTools() {
  return (
    <>
      <DraftModeToast />
      <VisualEditing />
    </>
  )
}
