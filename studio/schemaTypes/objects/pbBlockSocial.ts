import { UserPlus } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  title: 'Social Media',
  name: 'pbBlockSocial',
  type: 'object',
  icon: UserPlus,
  fields: [
    defineField({
      title: 'Use Footer Icons?',
      name: 'useFooterIcons',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'socialIcons',
      title: 'Social Icons',
      type: 'array',
      hidden: ({ parent }) => parent?.useFooterIcons,
      of: [
        {
          type: 'socialLink',
        },
      ],
    }),
  ],
  preview: {
    select: {
      useFooterIcons: 'useFooterIcons',
    },
    prepare(selection) {
      const { useFooterIcons } = selection
      return {
        title: 'Social Media',
        subtitle: useFooterIcons ? 'Uses Footer Icons' : 'Uses Manual Icons',
        media: UserPlus,
      }
    },
  },
})
