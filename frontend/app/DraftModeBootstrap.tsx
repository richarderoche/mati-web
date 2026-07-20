'use client'

import { useEffect, useState, type ComponentType } from 'react'

export function DraftModeBootstrap() {
  const [DraftTools, setDraftTools] = useState<ComponentType | null>(null)

  useEffect(() => {
    void import('./DraftModeTools').then((mod) => {
      setDraftTools(() => mod.DraftModeTools)
    })
  }, [])

  if (!DraftTools) return null
  return <DraftTools />
}
