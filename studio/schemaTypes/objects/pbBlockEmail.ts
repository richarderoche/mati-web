import { Mail } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pbBlockEmail',
  title: 'Email',
  type: 'object',
  icon: Mail,
  fields: [
    defineField({
      name: 'emailLabel',
      title: 'Label',
      type: 'string',
    }),
    defineField({
      name: 'emailAddress',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
  ],
  preview: {
    select: {
      emailLabel: 'emailLabel',
      emailAddress: 'emailAddress',
    },
    prepare({ emailLabel, emailAddress }) {
      return {
        title: 'Email: ' + emailLabel,
        subtitle: emailAddress,
        media: Mail,
      }
    },
  },
})
