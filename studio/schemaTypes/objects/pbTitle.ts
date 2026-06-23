import { IconBoxAlignTop } from '@tabler/icons-react'
import { defineField, defineType } from 'sanity'
import { getRowWidthTitle } from '../../lib/utils'
import { rowWidthField } from '../fields'

export default defineType({
  title: 'Title/Hero Section',
  name: 'pbTitleSection',
  type: 'object',
  icon: IconBoxAlignTop,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettings',
    }),
    defineField({
      title: 'Title Mode',
      name: 'titleMode',
      type: 'string',
      options: {
        list: [
          { title: 'Text Only', value: 'text' },
          { title: 'Hero Image', value: 'hero' },
        ],
      },
      initialValue: 'text',
    }),
    defineField({
      ...rowWidthField,
      hidden: ({ parent }) => parent?.titleMode === 'hero',
    }),
    defineField({
      title: 'Title (Small Label)',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Subtitle (Big Text)',
      name: 'subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'image',
      hidden: ({ parent }) => parent?.titleMode === 'text',
    }),
    defineField({
      title: 'Image Alt Text',
      name: 'heroImageAltText',
      type: 'string',
      hidden: ({ parent }) => parent?.titleMode === 'text',
    }),
    defineField({
      title: 'Image Position',
      description:
        'Image stretches to fill the hero area. Choose an anchor point if you prefer a different anchor point from the center.',
      name: 'heroImagePosition',
      type: 'string',
      hidden: ({ parent }) => parent?.titleMode === 'text',
      options: {
        list: [
          { title: 'Top Left', value: 'topLeft' },
          { title: 'Top Center', value: 'topCenter' },
          { title: 'Top Right', value: 'topRight' },
          { title: 'Center Left', value: 'centerLeft' },
          { title: 'Center Center', value: 'centerCenter' },
          { title: 'Center Right', value: 'centerRight' },
          { title: 'Bottom Center', value: 'bottomCenter' },
          { title: 'Bottom Left', value: 'bottomLeft' },
          { title: 'Bottom Right', value: 'bottomRight' },
        ],
      },
      initialValue: 'centerCenter',
    }),
  ],
  preview: {
    select: {
      rowWidth: 'rowWidth',
      titleMode: 'titleMode',
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({ rowWidth, titleMode, title, subtitle }) {
      const rowWidthTitle = getRowWidthTitle(rowWidth)
      const mode = titleMode === 'hero' ? 'Hero' : 'Text'
      const name = title || subtitle
      return {
        title: name ? `Title/Hero: ${name}` : 'Title/Hero Section',
        subtitle: `${rowWidthTitle} Width / ${mode} Mode`,
        media: IconBoxAlignTop,
      }
    },
  },
})
