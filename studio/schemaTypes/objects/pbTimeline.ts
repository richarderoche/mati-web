import { defineField, defineType } from 'sanity'
import { timelineIcon } from '../../lib/customIcons'
import { getRowWidthTitle } from '../../lib/utils'
import { rowWidthFieldLimited } from '../fields'

export default defineType({
  title: 'Timeline',
  name: 'pbTimeline',
  type: 'object',
  icon: timelineIcon,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettings',
    }),
    defineField(rowWidthFieldLimited),
    defineField({
      title: 'Title',
      description:
        'Use this instead of a separate Title/Hero section so it centers on desktop.',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Events',
      name: 'events',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              title: 'Label/Date',
              name: 'heading',
              type: 'string',
            }),
            defineField({
              title: 'Description',
              name: 'description',
              type: 'ptBody',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: {
                  previews: [{ title: '1:1', aspectRatio: 1 }],
                },
              },
            }),
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              heading: 'heading',
              description: 'description',
              image: 'image',
            },
            prepare({ heading, description, image }) {
              return {
                title: heading || 'No Heading',
                subtitle:
                  description && description.length > 0
                    ? description[0].children[0]?.text
                    : 'No Description',
                media: image ? image : timelineIcon,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      rowWidth: 'rowWidth',
      title: 'title',
      events: 'events',
    },
    prepare({ rowWidth, title, events }) {
      const rowWidthTitle = getRowWidthTitle(rowWidth)
      const rowCount = events ? events.length : 0
      return {
        title: title ? `Timeline: ${title}` : 'Timeline',
        subtitle: `${rowWidthTitle} Width / Events: ${rowCount || 'None'}`,
        media: timelineIcon,
      }
    },
  },
})
