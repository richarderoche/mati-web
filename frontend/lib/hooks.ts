import { useMediaQuery } from 'hamo'

export function useOrientation() {
  const isPortrait = useMediaQuery('(orientation: portrait)')
  const isLandscape = useMediaQuery('(orientation: landscape)')
  return { isPortrait, isLandscape }
}

/** True only when viewport is ≤768px *and* orientation is portrait (landscape phones are false). */
export function useIsMobile() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isPortrait = useMediaQuery('(orientation: portrait)')
  return isMobile && isPortrait
}

export function usePrefersReducedMotion() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  return prefersReducedMotion
}
