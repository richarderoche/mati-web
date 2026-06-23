import { ListOrdered } from 'lucide-react'
import { defineField, defineType } from 'sanity'
import { IconSequenceVertical } from '../../lib/customIcons'
import { sectionNameField } from '../fields'

export default defineType({
  title: 'Sequence Vertical',
  name: 'pbSequenceVertical',
  type: 'object',
  icon: IconSequenceVertical,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettings',
    }),
    defineField(sectionNameField),
    defineField({
      title: 'Column Proportions (Desktop & Tablet only)',
      name: 'columnProportions',
      type: 'string',
      initialValue: '50-50',
      options: {
        list: [
          { title: '50-50', value: '50-50' },
          { title: '60-40', value: '60-40' },
          { title: '40-60', value: '40-60' },
        ],
      },
    }),
    defineField({
      title: 'Sticky Column',
      name: 'stickyColumn',
      type: 'column',
    }),
    defineField({
      title: 'Steps',
      name: 'sequenceSteps',
      type: 'array',
      of: [
        defineField({
          title: 'Step',
          name: 'step',
          type: 'object',
          fields: [
            defineField({
              title: 'Title',
              name: 'title',
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
              title: 'title',
              description: 'description',
            },
            prepare({ title, description }) {
              return {
                title,
                subtitle:
                  description?.[0]?.children?.[0]?.text || 'No Description',
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
      sequenceSteps: 'sequenceSteps',
    },
    prepare({ sectionName, sequenceSteps }) {
      const stepQty = sequenceSteps ? sequenceSteps.length : 0
      return {
        title: sectionName ? `Sequence: ${sectionName}` : 'Sequence Vertical',
        subtitle: `${stepQty} steps`,
        media: IconSequenceVertical,
      }
    },
  },
})
