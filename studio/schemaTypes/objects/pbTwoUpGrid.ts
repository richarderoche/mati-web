import { IconLayoutColumns } from '@tabler/icons-react'
import { defineField, defineType } from 'sanity'
import { getRowWidthTitle } from '../../lib/utils'
import { rowWidthField, sectionNameField } from '../fields'

export default defineType({
  title: 'Two Column Grid',
  name: 'pbTwoUpGrid',
  type: 'object',
  icon: IconLayoutColumns,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettings',
    }),
    defineField(sectionNameField),
    defineField(rowWidthField),
    defineField({
      title: 'Show Grid Lines?',
      name: 'showGridLines',
      type: 'boolean',
      initialValue: false,
    }),
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
      title: 'Vertical Alignment (Desktop & Tablet only)',
      name: 'yAlignment',
      type: 'string',
      initialValue: 'items-center',
      hidden: ({ parent }) => parent?.showGridLines,
      options: {
        list: [
          { title: 'Top', value: 'items-start' },
          { title: 'Middle', value: 'items-center' },
          { title: 'Bottom', value: 'items-end' },
        ],
      },
    }),
    defineField({
      title: 'Column One',
      name: 'columnOne',
      type: 'column',
    }),
    defineField({
      title: 'Column Two',
      name: 'columnTwo',
      type: 'column',
    }),
  ],
  preview: {
    select: {
      sectionName: 'sectionName',
      rowWidth: 'rowWidth',
      showGridLines: 'showGridLines',
    },
    prepare({ sectionName, rowWidth, showGridLines }) {
      const rowWidthTitle = getRowWidthTitle(rowWidth)
      return {
        title: sectionName ? `Two Column: ${sectionName}` : 'Two Column Grid',
        subtitle: `${rowWidthTitle} Width ${showGridLines ? ' / Grid Lines' : ''}`,
        media: IconLayoutColumns,
      }
    },
  },
})
