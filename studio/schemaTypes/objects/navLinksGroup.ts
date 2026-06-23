import { SquareMenu } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  title: 'Nav Links Group',
  name: 'navGroup',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Group Title (Optional)',
      type: 'string',
    }),
    defineField({
      name: 'navItems',
      title: 'Navigation Items',
      type: 'array',
      of: [{ type: 'navPage' }, { type: 'navExternal' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      navItem1: 'navItems.0.title',
      navItem1PageTitle: 'navItems.0.page.title',
      navItem2: 'navItems.1.title',
      navItem2PageTitle: 'navItems.1.page.title',
      navItem3: 'navItems.2.title',
      navItem3PageTitle: 'navItems.2.page.title',
      navItem4Type: 'navItems.3._type',
    },
    prepare({
      title,
      navItem1,
      navItem2,
      navItem3,
      navItem1PageTitle,
      navItem2PageTitle,
      navItem3PageTitle,
      navItem4Type,
    }) {
      const navItemTitles = [
        navItem1 || navItem1PageTitle,
        navItem2 || navItem2PageTitle,
        navItem3 || navItem3PageTitle,
      ].filter(Boolean)
      const hasMore = navItem4Type ? true : false
      return {
        title: title ? `Nav Group: ${title}` : 'Nav Group',
        subtitle: hasMore
          ? `${navItemTitles.join(', ')}...`
          : navItemTitles.join(', '),
        media: SquareMenu,
      }
    },
  },
})
