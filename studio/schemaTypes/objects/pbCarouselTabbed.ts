import { PanelLeftOpen } from 'lucide-react'
import { defineField, defineType } from 'sanity'
import { sectionNameField } from '../fields'

export default defineType({
  title: 'Tabbed Carousel',
  name: 'pbCarouselTabbed',
  type: 'object',
  icon: PanelLeftOpen,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettings',
    }),
    defineField(sectionNameField),
    defineField({
      title: 'Numbering Style',
      name: 'numberingStyle',
      type: 'string',
      options: {
        list: [
          { title: 'Count (01, 02, 03, etc.)', value: 'sequential' },
          { title: 'Data (10k+, $3.5M, 100%, etc.)', value: 'data' },
        ],
      },
      initialValue: 'sequential',
    }),
    defineField({
      title: 'Image Mode',
      description:
        'Should images stretch to fill the slide area or be centered to fit in the middle of it?',
      name: 'imageMode',
      type: 'string',
      options: {
        list: [
          { title: 'Fill', value: 'fill' },
          { title: 'Fit', value: 'fit' },
        ],
      },
      initialValue: 'fill',
    }),
    defineField({
      title: 'Slides (Minimum 2, Maximum 5)',
      name: 'slides',
      type: 'array',
      validation: (Rule) => Rule.required().min(2).max(5),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: {
                  previews: [
                    { title: '1:1', aspectRatio: 1 },
                    { title: '4:5', aspectRatio: 0.8 },
                  ],
                },
              },
            }),
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            }),
            defineField({
              title: 'Label/Data Value',
              description:
                'Use this for a text label or data value, depending on the numbering style setting.',
              name: 'heading',
              type: 'string',
              hidden: ({ parent }) => parent?.parent?.numberingStyle === 'data',
            }),
            defineField({
              title: 'Description',
              name: 'description',
              type: 'text',
              rows: 3,
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
                subtitle: description ? description : 'No Description',
                media: image ? image : PanelLeftOpen,
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
      slides: 'slides',
    },
    prepare({ sectionName, slides }) {
      const slideCount = slides ? slides.length : 0
      return {
        title: sectionName
          ? `Tabbed Carousel: ${sectionName}`
          : 'Tabbed Carousel',
        subtitle: `Slides: ${slideCount || 'None'}`,
        media: PanelLeftOpen,
      }
    },
  },
})
