import { defineField, defineType } from 'sanity'
import { IconSpotlight } from '../../lib/customIcons'
import { capitalize } from '../../lib/utils'
import { rowWidthFieldLimited } from '../fields'

export default defineType({
  title: 'Spotlight',
  name: 'pbSpotlight',
  type: 'object',
  icon: IconSpotlight,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettings',
    }),
    defineField(rowWidthFieldLimited),
    defineField({
      title: 'Display Mode',
      name: 'displayMode',
      type: 'string',
      options: {
        list: [
          { title: 'Diptych', value: 'diptych' },
          { title: 'Banner', value: 'banner' },
        ],
      },
      initialValue: 'diptych',
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'image',
      options: {
        hotspot: {
          previews: [
            { title: 'Diptych', aspectRatio: 1 },
            { title: 'Banner', aspectRatio: 2 },
          ],
        },
      },
    }),
    defineField({
      title: 'Image Alt Text',
      name: 'imageAltText',
      type: 'string',
    }),
    defineField({
      name: 'priority',
      title: 'Priority Loading',
      type: 'boolean',
      description: 'Enable only for images above the fold',
      initialValue: false,
    }),
    defineField({
      name: 'sepiaTone',
      title: 'Sepia Tone?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      title: 'Rich Text',
      name: 'richText',
      type: 'pbBlockText',
    }),
    defineField({
      title: 'CTA Caption',
      name: 'ctaCaption',
      type: 'text',
      rows: 2,
    }),
    defineField({
      title: 'CTA Button',
      name: 'ctaButton',
      type: 'pbBlockButton',
    }),
    defineField({
      title: 'Show Backdrop Image?',
      name: 'showBackdropImage',
      type: 'boolean',
      initialValue: true,
      hidden: ({ parent }) => parent?.displayMode !== 'diptych',
    }),
    defineField({
      title: 'Card Position',
      name: 'cardPosition',
      type: 'string',
      hidden: ({ parent }) => parent?.displayMode !== 'banner',
      options: {
        list: [
          { title: 'Top Left', value: 'topLeft' },
          { title: 'Top Right', value: 'topRight' },
          { title: 'Bottom Left', value: 'bottomLeft' },
          { title: 'Bottom Right', value: 'bottomRight' },
        ],
      },
      initialValue: 'bottomRight',
    }),
  ],
  preview: {
    select: {
      displayMode: 'displayMode',
      image: 'image',
      ctaCaption: 'ctaCaption',
    },
    prepare({ displayMode, image, ctaCaption }) {
      return {
        title: ctaCaption ? `Spotlight: ${ctaCaption}` : 'Spotlight Section',
        subtitle: `${capitalize(displayMode)} Mode`,
        media: image ? image : IconSpotlight,
      }
    },
  },
})
