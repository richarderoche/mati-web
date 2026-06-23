import { IconBook } from '@tabler/icons-react'
import { defineField, defineType } from 'sanity'
import { rowWidthFieldLimited } from '../fields'

export default defineType({
  name: 'pbBlogThumbnails',
  title: 'Article Thumbnails',
  type: 'object',
  icon: IconBook,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettings',
    }),
    defineField(rowWidthFieldLimited),
    defineField({
      title: 'Selection Format',
      description:
        'Choose "All" for the main blog page, "Manual" for highlighting one or more posts on a different page.',
      name: 'selectionFormat',
      type: 'string',
      options: {
        list: [
          { title: 'All (By Date)', value: 'all' },
          { title: 'Manual', value: 'manual' },
        ],
      },
      initialValue: 'manual',
    }),
    defineField({
      title: 'Display Format',
      name: 'thumbnailSize',
      type: 'string',
      hidden: ({ parent }) => parent?.selectionFormat !== 'manual',
      options: {
        list: [
          { title: 'Vertical Card', value: 'small' },
          { title: 'Horizontal Basic', value: 'medium' },
          { title: 'Horizontal Grid', value: 'large' },
        ],
      },
      initialValue: 'small',
    }),
    defineField({
      title: 'Articles',
      description:
        'Only articles with internal or external links will be displayed in "Small" mode (no Quote Only articles)',
      name: 'blogPosts',
      type: 'array',
      hidden: ({ parent }) => parent?.selectionFormat !== 'manual',
      of: [
        {
          type: 'reference',
          to: [{ type: 'article' }, { type: 'farmerStory' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      selectionFormat: 'selectionFormat',
      thumbnailSize: 'thumbnailSize',
      blogPosts: 'blogPosts',
    },
    prepare({ selectionFormat, thumbnailSize, blogPosts }) {
      return {
        title: 'Article Thumbnails',
        subtitle: `${selectionFormat === 'all' ? 'All (By Date)' : 'Manual'} / Size: ${thumbnailSize === 'small' ? 'Small' : 'Large'}`,
        media: IconBook,
      }
    },
  },
})
