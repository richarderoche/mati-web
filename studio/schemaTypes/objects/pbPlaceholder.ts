import { IconBarrierBlockFilled } from '@tabler/icons-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  title: 'Placeholder Section',
  name: 'pbPlaceholder',
  type: 'object',
  icon: IconBarrierBlockFilled,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettings',
    }),
    defineField({
      title: 'Placeholder Title',
      name: 'placeholderTitle',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      placeholderTitle: 'placeholderTitle',
    },
    prepare({ placeholderTitle }) {
      return {
        title: placeholderTitle
          ? `Placeholder: ${placeholderTitle}`
          : 'Placeholder Section',
        media: IconBarrierBlockFilled,
      }
    },
  },
})
