import { ListChevronsUpDown } from 'lucide-react'
import { defineField, defineType } from 'sanity'
import { IconMatrixHero } from '../../lib/customIcons'

export default defineType({
  title: 'Matrix Hero Section',
  name: 'pbMatrixHero',
  type: 'object',
  icon: IconMatrixHero,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettings',
    }),
    defineField({
      title: 'Text/CTA Content',
      name: 'textCTAContent',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          title: 'Text Blocks',
          name: 'textBlocks',
          type: 'array',
          of: [{ type: 'pbBlockPlainText' }],
        }),
        defineField({
          title: 'CTA Buttons',
          name: 'ctaButtons',
          type: 'array',
          of: [{ type: 'pbBlockButton' }],
        }),
        defineField({
          title: 'Show Logo?',
          name: 'showLogo',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),
    defineField({
      title: 'Matrix Columns',
      description: 'Maximum 5',
      name: 'matrixColumns',
      type: 'array',
      validation: (Rule) => Rule.required().max(5),
      of: [
        {
          title: 'Matrix Column',
          name: 'matrixColumn',
          type: 'object',
          fields: [
            defineField({
              title: 'Speed (between 1 and 20)',
              name: 'speed',
              type: 'number',
              initialValue: 2,
              validation: (Rule) => Rule.required().min(1).max(20),
            }),
            defineField({
              title: 'Matrix Items',
              name: 'matrixItems',
              type: 'array',
              of: [{ type: 'matrixItem' }],
            }),
          ],
          preview: {
            select: {
              matrixItems: 'matrixItems',
              speed: 'speed',
            },
            prepare({ matrixItems, speed = 2 }) {
              return {
                title: 'Matrix Column',
                subtitle:
                  'Speed: ' +
                  speed +
                  ' / Items: ' +
                  (matrixItems ? matrixItems.length : 0),
                media: ListChevronsUpDown,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({ title }) {
      return {
        title: 'Matrix Hero Section',
        subtitle: title ? title : '',
        media: IconMatrixHero,
      }
    },
  },
})
