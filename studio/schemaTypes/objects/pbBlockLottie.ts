import { FilePlay } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pbBlockLottie',
  title: 'Lottie Animation',
  type: 'object',
  icon: FilePlay,
  fields: [
    defineField({
      name: 'lottieFile',
      title: 'Lottie File (.lottie only)',
      description: 'Info and conversion tools: https://dotlottie.io/',
      type: 'file',
      options: {
        accept: '.lottie',
      },
    }),
    defineField({
      title: 'Aspect Ratio',
      description: 'Examples: 1:1, 16:9, 1246:916, etc.',
      name: 'aspectRatio',
      type: 'object',
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
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Alt text for the lottie animation.',
    }),
  ],
  preview: {
    select: {
      lottieFile: 'lottieFile.asset->originalFilename',
    },
    prepare({ lottieFile }) {
      return {
        title: lottieFile ? 'Lottie: ' + lottieFile : 'Lottie',
        media: FilePlay,
      }
    },
  },
})
