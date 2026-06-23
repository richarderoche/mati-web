import { FilePlay } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'mediaLottie',
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
      name: 'disableCorners',
      title: 'Disable Rounded Corners?',
      description:
        'Disable if corner rounding causes issues (e.g. logos, icons, infographics).',
      type: 'boolean',
      initialValue: false,
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
