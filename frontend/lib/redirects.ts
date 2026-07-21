const toHome = [
  '/-',
  '/home',
  '/project_category',
  '/project_category/:path*',
  '/project_cat',
  '/project_cat/:path*',
  '/uthan_project',
  '/uthan_project/:path*',
]

const toTeam = [
  '/uthan_team',
  '/uthan_team/:path*',
  '/team_cat',
  '/team_cat/:path*',
]

const redirectsTeam = [
  ...toTeam.map((path) => ({
    source: path,
    destination: '/team',
    permanent: true,
  })),
]

const redirectsHome = [
  ...toHome.map((path) => ({
    source: path,
    destination: '/',
    permanent: true,
  })),
]

const toNews = [
  '/2023',
  '/2023/:path*',
  '/2024',
  '/2024/:path*',
  '/2025',
  '/2025/:path*',
  '/2026',
  '/2026/:path*',
  '/author',
  '/author/:path*',
  '/category',
  '/category/:path*',
  '/feed',
  '/tag',
  '/tag/:path*',
  '/topic',
  '/topic/:path*',
  '/topic/:path*',
  '/mati-carbon-launches-new-brand-identity',
  '/mati-carbon-adopts-new-brand-identity',
  '/announcement/:path*',
]

const redirectsNews = [
  ...toNews.map((path) => ({
    source: path,
    destination: '/news',
    permanent: true,
  })),
]

const redirectArticles = [
  {
    source: '/2024-wrapped',
    destination: '/articles/2024-wrapped',
    permanent: true,
  },
  {
    source: '/2025/01/06/2024-wrapped',
    destination: '/articles/2024-wrapped',
    permanent: true,
  },
  {
    source: '/2025-a-break-out-year-for-mati-carbon',
    destination: '/articles/2025-a-break-out-year-for-mati-carbon',
    permanent: true,
  },
  {
    source:
      '/2023/09/08/frontier-climate-selects-mati-carbon-in-its-cdr-pre-purchase-program-for-its-unique-scientific-mrv-process-and-farmer-co-benefits',
    destination:
      '/articles/frontier-climate-selects-mati-carbon-in-its-cdr-pre-purchase-program-for-its-unique-scientific',
    permanent: true,
  },
  {
    source:
      '/frontier-climate-selects-mati-carbon-in-its-cdr-pre-purchase-program-for-its-unique-scientific-mrv-process-and-farmer-co-benefits',
    destination:
      '/articles/frontier-climate-selects-mati-carbon-in-its-cdr-pre-purchase-program-for-its-unique-scientific',
    permanent: true,
  },
  {
    source: '/global-scalability-potential-of-enhanced-rock-weathering-erw',
    destination:
      '/articles/global-scalability-potential-of-enhanced-rock-weathering-erw',
    permanent: true,
  },
  {
    source:
      '/enhanced-weathering-in-the-us-corn-belt-delivers-carbon-removal-with-agronomic-benefits',
    destination:
      '/articles/enhanced-weathering-in-the-us-corn-belt-delivers-carbon-removal-with-agronomic-benefits',
    permanent: true,
  },
  {
    source: '/how-to-measure-carbon-removal-with-agronomic-benefits',
    destination:
      '/articles/how-to-measure-carbon-removal-with-agronomic-benefits',
    permanent: true,
  },
  {
    source:
      '/mati-carbon-announces-its-innovation-sprint-in-aim-for-climate-at-cop28dubai',
    destination:
      '/articles/mati-carbon-announces-its-innovation-sprint-in-aim-for-climate-at-cop28-dubai',
    permanent: true,
  },
  {
    source:
      '/mati-carbon-is-the-grand-prize-winner-of-the-xprize-carbon-removal-competition',
    destination: '/articles/mati-carbon-is-the-usd50m-grand-prize-winner',
    permanent: true,
  },
  {
    source:
      '/mati-carbon-marks-historic-milestone-in-the-global-south-with-the-first-delivery-of-engineered-carbon-removal-tonnes',
    destination:
      '/articles/mati-carbon-marks-historic-milestone-in-the-global-south-with-the-first-delivery-of-engineered',
    permanent: true,
  },
  {
    source:
      '/mati-carbon-secures-innovative-debt-facility-to-scale-its-carbon-removal-business-globally-and-boost-climate-resilience',
    destination:
      '/articles/mati-carbon-secures-innovative-debt-facility-to-scale-its-carbon-removal-business-globally-and',
    permanent: true,
  },
  {
    source: '/mati-carbon-selected-in-milkywires-climate-transformation-fund',
    destination:
      '/articles/mati-carbon-selected-in-milkywire-s-climate-transformation-fund',
    permanent: true,
  },
  {
    source:
      '/mati-carbon-selected-as-top-20-finalist-for-xprize-carbon-removal',
    destination:
      '/articles/mati-carbon-selected-as-top-20-finalist-for-xprize-carbon-removal',
    permanent: true,
  },
  {
    source: '/reflections-from-london-climate-action-week-2026',
    destination: '/articles/reflections-from-london-climate-action-week-2026',
    permanent: true,
  },
  {
    source: '/thank-you-2023-hello-2024',
    destination: '/articles/thank-you-2023-hello-2024',
    permanent: true,
  },
  {
    source: '/weve-been-certified',
    destination: '/articles/we-ve-been-certified',
    permanent: true,
  },
  {
    source: '/what-it-actually-takes-to-verify-carbon-removal',
    destination: '/articles/what-it-actually-takes-to-verify-carbon-removal',
    permanent: true,
  },
]

// Include articles first to avoid conflicts with news redirects
export const redirects = [
  ...redirectArticles,
  ...redirectsNews,
  ...redirectsHome,
  ...redirectsTeam,
]
