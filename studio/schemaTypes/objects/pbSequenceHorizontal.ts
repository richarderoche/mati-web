import {
  CaseSensitive,
  LineDotRightHorizontal,
  ListOrdered,
} from 'lucide-react'
import { defineField, defineType } from 'sanity'
import { rowWidthFieldLimited, sectionNameField } from '../fields'

export default defineType({
  title: 'Sequence Horizontal',
  name: 'pbSequenceHorizontal',
  type: 'object',
  icon: LineDotRightHorizontal,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettings',
    }),
    defineField(sectionNameField),
    defineField(rowWidthFieldLimited),
    defineField({
      title: 'Media Aspect Ratio',
      description:
        'All images/animations will be this ratio. Examples: 1:1, 16:9, etc.',
      name: 'aspectRatio',
      type: 'object',
      options: {
        collapsible: true,
      },
      fields: [
        defineField({
          title: 'Width',
          name: 'width',
          type: 'number',
          initialValue: 1,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          title: 'Height',
          name: 'height',
          type: 'number',
          initialValue: 1,
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      title: 'Phases',
      name: 'sequencePhases',
      type: 'array',
      of: [
        defineField({
          title: 'Phase',
          name: 'phase',
          type: 'object',
          fields: [
            defineField({
              title: 'Label',
              name: 'label',
              type: 'string',
            }),
            defineField({
              title: 'Media',
              name: 'media',
              type: 'array',
              of: [{ type: 'mediaImage' }, { type: 'mediaLottie' }],
              validation: (Rule) => Rule.max(1),
            }),
            defineField({
              title: 'Steps',
              name: 'steps',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'textContent', type: 'text', rows: 4 }),
                    defineField({
                      name: 'isHeading',
                      title: 'Heading Style?',
                      description:
                        'If enabled, this line will be emphasized and given margin below.',
                      type: 'boolean',
                      initialValue: false,
                    }),
                  ],
                  preview: {
                    select: {
                      textContent: 'textContent',
                    },
                    prepare({ textContent }) {
                      return {
                        title: textContent,
                        media: CaseSensitive,
                      }
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {
              label: 'label',
            },
            prepare({ label }) {
              return {
                title: label,
                media: ListOrdered,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      sectionName: 'sectionName',
      sequencePhases: 'sequencePhases',
    },
    prepare({ sectionName, sequencePhases }) {
      const phaseQty = sequencePhases ? sequencePhases.length : 0
      return {
        title: sectionName ? `Sequence: ${sectionName}` : 'Sequence Horizontal',
        subtitle: `${phaseQty} phases`,
        media: LineDotRightHorizontal,
      }
    },
  },
})
