import { TextInitial } from 'lucide-react'
import { defineField, defineType } from 'sanity'

const bodyTextSizeOptions = [
  { title: 'Extra Small', value: 'ts-p-xs' },
  { title: 'Small', value: 'ts-p-sm' },
  { title: 'Medium', value: 'ts-p-md' },
  { title: 'Large', value: 'ts-p-lg' },
  { title: 'Extra Large', value: 'ts-p-xl' },
]

const colorOptions = [
  { title: 'Default', value: 'rte-color-normal' },
  { title: 'Subtle', value: 'rte-color-subtle' },
  { title: 'Blue', value: 'rte-color-blue' },
]

export default defineType({
  name: 'pbBlockText',
  title: 'Rich Text',
  type: 'object',
  icon: TextInitial,
  fields: [
    defineField({
      title: 'Body Text Size',
      description: 'Affects the size of the paragraph and list text',
      name: 'bodyTextSize',
      type: 'string',
      options: {
        list: bodyTextSizeOptions,
      },
      initialValue: 'ts-p-md',
    }),
    defineField({
      title: 'Color',
      name: 'color',
      type: 'string',
      initialValue: 'rte-color-normal',
      options: {
        list: colorOptions,
      },
    }),
    defineField({ name: 'textContent', title: 'Content', type: 'ptBasic' }),
  ],
  preview: {
    select: {
      content: 'textContent',
      bodyTextSize: 'bodyTextSize',
    },
    prepare({ content, bodyTextSize }) {
      const bodyTextSizeText =
        bodyTextSizeOptions.find((o) => o.value === bodyTextSize)?.title ??
        'Normal'
      return {
        title: 'Rich Text: ' + bodyTextSizeText,
        subtitle:
          content && content.length > 0
            ? content[0].children[0]?.text
            : 'No Content',
        media: TextInitial,
      }
    },
  },
})
