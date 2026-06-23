import { ImageIcon } from 'lucide-react'
import { defineField, defineType } from 'sanity'
import { crops, hotspotPreviews } from './pbBlockImage'

export default defineType({
  title: 'Matrix Item',
  name: 'matrixItem',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'image',
      options: {
        hotspot: {
          previews: hotspotPreviews,
        },
      },
    }),
    defineField({
      name: 'imageCrop',
      title: 'Aspect Ratio',
      type: 'number',
      options: {
        list: crops,
      },
      initialValue: 0,
    }),
    defineField({
      title: 'Details',
      name: 'details',
      type: 'object',
      fields: [
        defineField({
          title: 'Location',
          name: 'location',
          type: 'string',
        }),
        defineField({
          title: 'Date',
          name: 'date',
          type: 'text',
          rows: 1,
          placeholder: 'e.g. March 2026',
        }),
        defineField({
          title: 'Description',
          name: 'description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          title: 'Custom Details',
          name: 'customDetails',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  title: 'Label',
                  name: 'label',
                  type: 'string',
                }),
                defineField({
                  title: 'Value',
                  name: 'value',
                  type: 'string',
                }),
              ],
              preview: {
                select: {
                  label: 'label',
                  value: 'value',
                },
                prepare({ label, value }) {
                  return { title: label, subtitle: value }
                },
              },
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      image: 'image',
    },
    prepare({ title, image }) {
      return {
        title: title,
        media: image ? image : ImageIcon,
      }
    },
  },
})
