import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      name: 'header',
      title: 'Header',
    },
    {
      name: 'footer',
      title: 'Footer',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'scripts',
      title: 'Scripts',
    },
  ],
  fields: [
    defineField({
      name: 'mainNav',
      title: 'Main Navigation - Column 1',
      type: 'array',
      group: 'header',
      of: [{ type: 'navGroup' }],
    }),
    defineField({
      name: 'mainNav2',
      title: 'Main Navigation - Column 2',
      type: 'array',
      group: 'header',
      of: [{ type: 'navGroup' }],
    }),
    defineField({
      title: 'CTA Button',
      name: 'ctaButton',
      type: 'pbBlockButton',
    }),
    defineField({
      title: 'Main Nav Image',
      name: 'mainNavImage',
      type: 'image',
      options: {
        hotspot: {
          previews: [{ title: '6:4 (Mobile, Tablet)', aspectRatio: 1.5 }],
        },
      },
      group: 'header',
    }),
    defineField({
      title: 'Image Alt Text',
      name: 'mainNavImageAltText',
      type: 'string',
    }),
    defineField({
      title: 'Image Position',
      description:
        'On desktop, image stretches to fill the available area. Choose an anchor point if you prefer a different anchor point from the center.',
      name: 'mainNavImagePosition',
      type: 'string',
      options: {
        list: [
          { title: 'Top Left', value: 'topLeft' },
          { title: 'Top Center', value: 'topCenter' },
          { title: 'Top Right', value: 'topRight' },
          { title: 'Center Left', value: 'centerLeft' },
          { title: 'Center Center', value: 'centerCenter' },
          { title: 'Center Right', value: 'centerRight' },
          { title: 'Bottom Center', value: 'bottomCenter' },
          { title: 'Bottom Left', value: 'bottomLeft' },
          { title: 'Bottom Right', value: 'bottomRight' },
        ],
      },
      initialValue: 'centerCenter',
    }),
    defineField({
      title: 'Footer Blurb',
      name: 'footerBlurb',
      type: 'object',
      group: 'footer',
      fields: [
        defineField({
          name: 'textContent',
          title: 'Content',
          type: 'ptSlim',
        }),
      ],
    }),
    defineField({
      title: 'Footer CTA 1 - Button',
      description: 'Optional CTA near social icons',
      name: 'footerCTAButton',
      type: 'array',
      of: [{ type: 'navPage' }, { type: 'navExternal' }],
      group: 'footer',
      validation: (Rule) => Rule.max(1),
    }),

    defineField({
      name: 'socialIcons',
      title: 'Social Icons',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'socialLink',
        },
      ],
    }),
    defineField({
      title: 'Footer Main Nav',
      name: 'footerNav',
      type: 'navLinks',
      group: 'footer',
    }),
    defineField({
      title: 'Footer CTA 2 - Type',
      description: 'Optional CTA near social icons',
      name: 'footerCTA2Type',
      type: 'string',
      options: {
        list: [
          { title: 'Button', value: 'button' },
          { title: 'Mailchimp', value: 'mailchimp' },
          { title: 'None', value: 'none' },
        ],
      },
      initialValue: 'none',
      group: 'footer',
    }),
    defineField({
      title: 'Footer CTA 2 - Button',
      name: 'footerCTAButton2',
      type: 'array',
      of: [{ type: 'navPage' }, { type: 'navExternal' }],
      group: 'footer',
      hidden: ({ parent }) => parent?.footerCTA2Type !== 'button',
      validation: (Rule) => Rule.max(1),
    }),
    defineField({
      title: 'Footer CTA 2 - Mailchimp',
      name: 'footerCTAMailchimp',
      type: 'object',
      group: 'footer',
      hidden: ({ parent }) => parent?.footerCTA2Type !== 'mailchimp',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          description: 'e.g. Join our newsletter',
        }),
        defineField({
          name: 'mcFormUrl',
          title: 'Form Full URL',
          type: 'string',
          description:
            'e.g. https://your-company.us18.list-manage.com/subscribe?u=a123cd45678ef90g7h1j7k9lm&id=ab2c468d10',
        }),
        defineField({
          name: 'mcEmailName',
          title: 'Email Field "name" value',
          type: 'string',
          description:
            'Inspect your email input field to find the "name" value in the html. e.g. MERGE0',
        }),
      ],
    }),
    defineField({
      title: 'Footer Locations',
      name: 'footerLocations',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      title: 'Footer Secondary Nav',
      name: 'footerSecondaryNav',
      description: 'Terms, Privacy, etc.',
      type: 'navLinks',
      group: 'footer',
    }),
    defineField({
      title: 'Footer Company Name',
      name: 'footerCompanyName',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'title',
      description: 'Used as the base in the <title> tag for SEO',
      title: 'Site Title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seo',
      title: 'Global SEO',
      description: 'Fallback SEO content for any page left blank',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'googletagmanagerID',
      title: 'Google Tag Manager ID',
      type: 'string',
      description:
        'If you need a cookie consent banner, use the custom scripts field below instead of this.',
      group: 'scripts',
    }),
    defineField({
      name: 'customScripts',
      title: 'Custom Scripts',
      type: 'array',
      of: [
        {
          name: 'customScript',
          title: 'Custom Script',
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name (for your reference)',
              type: 'string',
            },
            {
              name: 'script',
              title: 'Script',
              type: 'text',
            },
            {
              name: 'category',
              title: 'Category',
              type: 'string',
              description:
                'Necessary: scripts that are required for the site to function. (e.g. Support chat, etc.) Analytics: scripts that are used to track site usage. (Triggers cookie consent banner) Marketing: scripts that are used to track marketing efforts. (Triggers cookie consent banner)',
              options: {
                list: ['necessary', 'analytics', 'marketing'],
              },
              initialValue: 'necessary',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              name: 'name',
              category: 'category',
            },
            prepare({ name = 'Custom Script', category }) {
              return {
                title: name,
                subtitle: category,
              }
            },
          },
        },
      ],
      group: 'scripts',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      }
    },
  },
})
