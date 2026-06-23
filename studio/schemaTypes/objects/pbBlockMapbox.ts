import { Earth } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pbBlockMapbox',
  title: 'Mapbox',
  type: 'object',
  icon: Earth,
  fields: [
    defineField({
      title: 'URL',
      name: 'accessToken',
      description: 'The access token for the Mapbox map',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Style URL',
      name: 'styleUrl',
      description: 'Make sure to copy the Production (not Draft) style URL',
      type: 'string',
      placeholder: 'mapbox://styles/user/id',
    }),
    defineField({
      title: 'Center (Latitude, Longitude)',
      name: 'mapboxCenter',
      type: 'object',
      fields: [
        defineField({
          title: 'Latitude',
          name: 'latitude',
          type: 'number',
        }),
        defineField({
          title: 'Longitude',
          name: 'longitude',
          type: 'number',
        }),
      ],
    }),
    defineField({
      title: 'Mapbox Zoom',
      name: 'mapboxZoom',
      type: 'number',
    }),
    defineField({
      title: 'Container Aspect Ratio',
      name: 'mapboxAspectRatio',
      type: 'object',
      fields: [
        defineField({
          title: 'Width',
          name: 'width',
          type: 'number',
          initialValue: 16,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          title: 'Height',
          name: 'height',
          type: 'number',
          initialValue: 9,
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      centerLatitude: 'mapboxCenter.latitude',
      centerLongitude: 'mapboxCenter.longitude',
      mapboxZoom: 'mapboxZoom',
      ratioWidth: 'mapboxAspectRatio.width',
      ratioHeight: 'mapboxAspectRatio.height',
    },
    prepare({
      centerLatitude,
      centerLongitude,
      mapboxZoom,
      ratioWidth,
      ratioHeight,
    }) {
      const hasLatLong = centerLatitude && centerLongitude
      const center = hasLatLong ? `${centerLatitude}, ${centerLongitude}` : null
      const ratio = `${ratioWidth} : ${ratioHeight}`
      const details = [center, mapboxZoom, ratio].filter(Boolean).join(' / ')
      return {
        title: 'Mapbox',
        subtitle: details,
        media: Earth,
      }
    },
  },
})
