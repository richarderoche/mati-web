import localFont from 'next/font/local'

export const serifFont = localFont({
  src: [
    {
      path: '../public/fonts/SeasonSerif-Regular.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  preload: true,
  variable: '--season-serif',
})

export const sansFont = localFont({
  src: [
    {
      path: '../public/fonts/SharpEarth-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/SharpEarth-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/SharpEarth-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/SharpEarth-Italic.woff',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/SharpEarth-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/SharpEarth-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/SharpEarth-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/fonts/SharpEarth-MediumItalic.woff',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/fonts/SharpEarth-ExtraBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/SharpEarth-ExtraBold.woff',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--sharp-earth',
})

export const devanagariFont = localFont({
  src: [
    {
      path: '../public/fonts/SharpEarthDevanagari-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/SharpEarthDevanagari-Regular.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--devanagari',
})
