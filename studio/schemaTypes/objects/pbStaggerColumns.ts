import { defineField, defineType } from 'sanity'
import { staggerColumnsIcon } from '../../lib/customIcons'
import { getRowWidthTitle } from '../../lib/utils'
import { rowWidthFieldLimited } from '../fields'

export default defineType({
  title: 'Stagger Columns',
  name: 'pbStaggerColumns',
  type: 'object',
  icon: staggerColumnsIcon,
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
      title: 'Columns (Minimum 2, Maximum 4)',
      name: 'columns',
      type: 'array',
      validation: (Rule) => Rule.required().min(2).max(4),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
            }),
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            }),
            defineField({
              title: 'Heading',
              name: 'heading',
              type: 'string',
            }),
            defineField({
              title: 'Description',
              name: 'description',
              type: 'ptBody',
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
                media: image ? image : staggerColumnsIcon,
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
      columns: 'columns',
    },
    prepare({ rowWidth, title, columns }) {
      const rowWidthTitle = getRowWidthTitle(rowWidth)
      const columnCount = columns ? columns.length : 0
      return {
        title: title ? `Stagger Columns: ${title}` : 'Stagger Columns',
        subtitle: `${rowWidthTitle} Width / Columns: ${columnCount || 'None'}`,
        media: staggerColumnsIcon,
      }
    },
  },
})
