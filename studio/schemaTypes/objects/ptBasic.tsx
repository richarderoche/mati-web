import { DocumentPdfIcon, DocumentSheetIcon } from '@sanity/icons'
import { Heading } from '@sanity/ui'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'ptBasic',
  title: 'RTE',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({
                name: 'href',
                type: 'url',
                title: 'Url',
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              }),
            ],
          },
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal link',
            icon: DocumentSheetIcon,
            fields: [
              defineField({
                name: 'reference',
                type: 'reference',
                title: 'Reference',
                to: [{ type: 'page' }],
              }),
            ],
          },
          {
            name: 'fileLink',
            type: 'object',
            title: 'File link',
            icon: DocumentPdfIcon,
            fields: [
              defineField({
                title: 'File',
                name: 'file',
                type: 'file',
                options: {
                  accept: '.pdf,.doc,.docx,.ppt,.pptx',
                },
              }),
            ],
          },
        ],
      },
      styles: [
        { title: 'Normal', value: 'normal' },
        {
          title: 'Heading 1 - Serif',
          value: 'h1',
          component: (props) => (
            <Heading as="h1" size={5} style={{ fontFamily: 'serif' }}>
              {props.children}
            </Heading>
          ),
        },
        {
          title: 'Heading 2 - Serif',
          value: 'h2',
          component: (props) => (
            <Heading as="h2" size={4} style={{ fontFamily: 'serif' }}>
              {props.children}
            </Heading>
          ),
        },
        {
          title: 'Heading 3 - Serif',
          value: 'h3',
          component: (props) => (
            <Heading as="h3" size={3} style={{ fontFamily: 'serif' }}>
              {props.children}
            </Heading>
          ),
        },
        {
          title: 'Heading 4 - Serif',
          value: 'h4serif',
          component: (props) => (
            <Heading as="h4" size={2} style={{ fontFamily: 'serif' }}>
              {props.children}
            </Heading>
          ),
        },
        {
          title: 'Heading 4 - Sans',
          value: 'h4',
          component: (props) => (
            <Heading as="h4" size={2}>
              {props.children}
            </Heading>
          ),
        },
        {
          title: 'Label',
          value: 'h5',
          component: (props) => (
            <Heading as="h5" size={1} style={{ textTransform: 'uppercase' }}>
              {props.children}
            </Heading>
          ),
        },
        {
          title: 'Label Small',
          value: 'h6',
          component: (props) => (
            <Heading as="h6" size={0} style={{ textTransform: 'uppercase' }}>
              {props.children}
            </Heading>
          ),
        },
      ],
    }),
  ],
})
