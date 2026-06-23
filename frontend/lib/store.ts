import { create } from 'zustand'

type Store = {
  enablePageTransition: boolean
  setEnablePageTransition: (value: boolean) => void
  isHeaderNavOpen: boolean
  setIsHeaderNavOpen: (value: boolean) => void
  pauseLenis: boolean
  setPauseLenis: (value: boolean) => void
}

export const useStore = create<Store>((set) => ({
  enablePageTransition: false,
  setEnablePageTransition: (value: boolean) =>
    set({ enablePageTransition: value }),
  isHeaderNavOpen: false,
  setIsHeaderNavOpen: (value: boolean) => set({ isHeaderNavOpen: value }),
  pauseLenis: false,
  setPauseLenis: (value: boolean) => set({ pauseLenis: value }),
}))
