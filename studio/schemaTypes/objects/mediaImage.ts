import { Image as ImageIcon } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const hotspotPreviews = [
  { title: '1:1', aspectRatio: 1 },
  { title: '4:6', aspectRatio: 0.6666666667 },
  { title: '6:4', aspectRatio: 1.5 },
  { title: '16:9', aspectRatio: 1.7777777778 },
  { title: '5:2', aspectRatio: 2.5 },
]

export default defineType({
  name: 'mediaImage',
  title: 'Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
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
  preview: {
    select: {
      image: 'image.asset',
      filename: 'image.asset->originalFilename',
      sepiaTone: 'sepiaTone',
    },
    prepare({ image, filename, sepiaTone }) {
      const sepiaToneText = sepiaTone ? 'Sepia' : 'Normal'
      return {
        title: filename ? 'Image: ' + filename : 'Image',
        subtitle: 'Tone: ' + sepiaToneText,
        media: image ? image : ImageIcon,
      }
    },
  },
})
