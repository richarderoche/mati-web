import { IconListDetails } from '@tabler/icons-react'
import { defineField, defineType } from 'sanity'
import { getRowWidthTitle } from '../../lib/utils'
import { rowWidthFieldLimited } from '../fields'
import { crops, hotspotPreviews } from './pbBlockImage'

export default defineType({
  title: 'Detailed List',
  name: 'pbDetailedList',
  type: 'object',
  icon: IconListDetails,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettings',
    }),
    defineField(rowWidthFieldLimited),
    defineField({
      title: 'Show Numbers?',
      name: 'showNumbers',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      title: 'Include Images?',
      name: 'showImage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      title: 'Image Settings (applies to all)',
      name: 'imageSettings',
      type: 'object',
      hidden: ({ parent }) => !parent?.showImage,
      fields: [
        defineField({
          title: 'Image Crop',
          name: 'imageCrop',
          type: 'number',
          options: {
            list: crops,
          },
          initialValue: 0,
        }),
        defineField({
          name: 'sepiaTone',
          title: 'Sepia Tone?',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'disableCorners',
          title: 'Disable Rounded Corners?',
          description:
            'Disable if corner rounding causes issues (e.g. logos, icons, infographics).',
          type: 'boolean',
          initialValue: false,
        }),
      ],
    }),
    defineField({
      title: 'Rows',
      name: 'rows',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              title: 'Heading',
              name: 'heading',
              type: 'string',
            }),
            defineField({
              title: 'Description',
              name: 'description',
              type: 'ptBasic',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: {
                  previews: hotspotPreviews,
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
              showImage: 'showImage',
              image: 'image',
            },
            prepare({ heading, description, showImage, image }) {
              return {
                title: heading || 'No Heading',
                subtitle:
                  description && description.length > 0
                    ? description[0].children[0]?.text
                    : 'No Description',
                media: showImage ? image || IconListDetails : IconListDetails,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      sectionName: 'sectionName',
      rowWidth: 'rowWidth',
      rows: 'rows',
    },
    prepare({ rowWidth, rows }) {
      const rowWidthTitle = getRowWidthTitle(rowWidth)
      const rowCount = rows ? rows.length : 0
      return {
        title: 'Detailed List',
        subtitle: `${rowWidthTitle} Width / Rows: ${rowCount || 'None'}`,
        media: IconListDetails,
      }
    },
  },
})
