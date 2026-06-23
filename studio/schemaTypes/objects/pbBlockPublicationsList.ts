import { GraduationCapIcon } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  title: 'Publications List',
  name: 'pbBlockPublicationsList',
  type: 'object',
  icon: GraduationCapIcon,
  fields: [
    defineField({
      title: 'Category Heading',
      name: 'heading',
      type: 'string',
    }),
    defineField({
      title: 'Publications',
      name: 'publications',
      type: 'array',
      of: [
        {
          title: 'Publications',
          name: 'publications',
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
              type: 'text',
              rows: 3,
            }),
            defineField({
              title: 'Authors',
              name: 'authors',
              type: 'array',
              of: [
                {
                  title: 'Author',
                  name: 'author',
                  type: 'object',
                  fields: [
                    defineField({
                      title: 'Name',
                      name: 'name',
                      type: 'string',
                    }),
                    defineField({
                      title: 'Highlight?',
                      name: 'highlight',
                      type: 'boolean',
                      initialValue: false,
                    }),
                  ],
                  preview: {
                    select: {
                      name: 'name',
                      highlight: 'highlight',
                    },
                    prepare({ name, highlight }) {
                      return {
                        title: name,
                        subtitle: highlight ? 'Highlighted' : '',
                      }
                    },
                  },
                },
              ],
            }),
            defineField({
              title: 'Date / Label',
              name: 'dateLabel',
              type: 'string',
              placeholder: 'e.g. Sept 2005',
            }),
            defineField({
              title: 'Link type',
              name: 'linkType',
              type: 'string',
              options: {
                list: [
                  { title: 'External', value: 'externalLink' },
                  { title: 'File', value: 'file' },
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
            }),
            defineField({
              title: 'External Link URL',
              name: 'url',
              type: 'url',
              hidden: ({ parent }) => parent?.linkType !== 'externalLink',
              placeholder: 'e.g. https://www.example.com',
              validation: (Rule) =>
                Rule.uri({
                  scheme: ['http', 'https'],
                }),
            }),
            defineField({
              title: 'File',
              name: 'file',
              type: 'file',
              hidden: ({ parent }) => parent?.linkType !== 'file',
              options: {
                accept: '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx',
              },
            }),
            defineField({
              title: 'Link Text (defaults to URL if left blank)',
              name: 'linkText',
              type: 'string',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      publications: 'publications',
    },
    prepare({ heading, publications }) {
      return {
        title: 'Publications List: ' + heading,
        subtitle:
          publications.length > 0
            ? publications.length + ' publications'
            : 'No publications',
        media: GraduationCapIcon,
      }
    },
  },
})
