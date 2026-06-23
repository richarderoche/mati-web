import { defineType } from 'sanity'

export default defineType({
  title: 'Sections',
  name: 'pbSections',
  type: 'array',
  of: [
    { type: 'pbTitleSection' },
    { type: 'pbSingleColumn' },
    { type: 'pbTwoUpGrid' },
    { type: 'pbGrid' },
    { type: 'pbSpotlight' },
    { type: 'pbCarouselTabbed' },
    { type: 'pbDetailedList' },
    { type: 'pbJobs' },
    { type: 'pbTimeline' },
    { type: 'pbBlogThumbnails' },
    { type: 'pbStaggerColumns' },
    { type: 'pbSequenceHorizontal' },
    { type: 'pbSequenceVertical' },
    { type: 'pbMatrixHero' },
    { type: 'pbPlaceholder' },
  ],
  options: {
    insertMenu: {
      groups: [
        {
          name: 'essential',
          title: 'Essential',
          of: [
            'pbTitleSection',
            'pbSingleColumn',
            'pbTwoUpGrid',
            'pbSpotlight',
            'pbGrid',
          ],
        },
        {
          name: 'specialty',
          title: 'Specialty',
          of: [
            'pbCarouselTabbed',
            'pbDetailedList',
            'pbSequenceHorizontal',
            'pbSequenceVertical',
            'pbJobs',
            'pbTimeline',
            'pbBlogThumbnails',
            'pbStaggerColumns',
            'pbMatrixHero',
          ],
        },
      ],
    },
  },
})
