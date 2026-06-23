import { StackCompactIcon } from '@sanity/icons'
import { Tractor } from 'lucide-react'
import { defineField, defineType } from 'sanity'
import { isUniqueArticleRouteSlug } from '../../lib/utils'

export default defineType({
  name: 'farmerStory',
  title: 'Farmer Stories',
  type: 'document',
  icon: Tractor,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => isUniqueArticleRouteSlug(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image / Thumbnail',
      type: 'image',
      options: {
        hotspot: {
          previews: [
            { title: 'Cover', aspectRatio: 1 },
            { title: 'Thumbnail', aspectRatio: 16 / 9 },
          ],
        },
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImageAlt',
      title: 'Cover Image Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'postType',
      title: 'Post Type',
      type: 'string',
      options: {
        list: [
          { title: 'Internal Page', value: 'internal' },
          { title: 'Quote Only', value: 'quoteOnly' },
        ],
      },
      initialValue: 'quoteOnly',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quoteEnglish',
      title: 'Quote English',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'nativeAlphabet',
      title: 'Native Alphabet',
      type: 'string',
      options: {
        list: [
          { title: 'Latin', value: 'latin' },
          { title: 'Devanagari', value: 'devanagari' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'latin',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quoteNative',
      title: 'Quote Native Language',
      type: 'text',
      rows: 3,
      placeholder: 'Make sure to choose Devanagari above if needed',
    }),
    defineField({
      name: 'introText',
      title: 'Intro/Summary Text',
      type: 'text',
      rows: 3,
      hidden: ({ parent }) => parent?.postType !== 'internal',
    }),
    defineField({
      title: 'Page Builder',
      name: 'pbSections',
      type: 'pbSections',
      hidden: ({ parent }) => parent?.postType !== 'internal',
      icon: StackCompactIcon,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      description:
        'Override image and description here (defaults to cover image and introduction text).',
      hidden: ({ parent }) => parent?.postType !== 'internal',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      coverImage: 'coverImage.asset',
    },
    prepare({ title, coverImage }) {
      return {
        title,
        media: coverImage || Tractor,
      }
    },
  },
})
