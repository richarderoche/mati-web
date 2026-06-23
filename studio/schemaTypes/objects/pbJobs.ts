import { IconBriefcase } from '@tabler/icons-react'
import { defineField, defineType } from 'sanity'
import { getRowWidthTitle } from '../../lib/utils'
import { rowWidthField } from '../fields'

export default defineType({
  title: 'Jobs List',
  name: 'pbJobs',
  type: 'object',
  icon: IconBriefcase,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettings',
    }),
    defineField(rowWidthField),
    defineField({
      title: 'Jobs',
      name: 'jobs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              title: 'Job Title',
              name: 'jobTitle',
              type: 'string',
            }),
            defineField({
              title: 'Job Category',
              name: 'jobCategory',
              type: 'string',
            }),
            defineField({
              title: 'Job Location',
              name: 'jobLocation',
              type: 'string',
            }),
            defineField({
              title: 'Job Buttons',
              name: 'jobButtons',
              type: 'array',
              of: [{ type: 'pbBlockButton' }],
              initialValue: [
                {
                  _type: 'pbBlockButton',
                  linkType: 'externalLink',
                  externalLink: {
                    title: 'Apply',
                  },
                  sitePage: {
                    title: 'Apply',
                  },
                  fileLink: {
                    buttonText: 'Apply',
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              jobTitle: 'jobTitle',
              jobCategory: 'jobCategory',
              jobLocation: 'jobLocation',
            },
            prepare({ jobTitle, jobCategory, jobLocation }) {
              const details = [jobCategory, jobLocation]
                .filter(Boolean)
                .join(' / ')
              return {
                title: jobTitle,
                subtitle: details,
                media: IconBriefcase,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      sectionName: 'sectionName',
      rowWidth: 'rowWidth',
      jobs: 'jobs',
    },
    prepare({ rowWidth, jobs }) {
      const rowWidthTitle = getRowWidthTitle(rowWidth)
      const jobCount = jobs ? jobs.length : 0
      return {
        title: 'Jobs List',
        subtitle: `${rowWidthTitle} Width / Jobs: ${jobCount || 'None'}`,
        media: IconBriefcase,
      }
    },
  },
})
