import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'collection',
  title: 'Collections',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Collection Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'season',
      title: 'Season',
      type: 'string',
      options: {
        list: [
          { title: 'FW 2025', value: 'fw25' },
          { title: 'SS 2025', value: 'ss25' },
          { title: 'FW 2024', value: 'fw24' },
          { title: 'SS 2024', value: 'ss24' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required().min(2020).max(2030),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'In Progress', value: 'in_progress' },
          { title: 'Testing', value: 'testing' },
          { title: 'Complete', value: 'complete' },
        ],
        layout: 'radio',
      },
      initialValue: 'in_progress',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Collection Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Collection Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'concept',
      title: 'Design Concept',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'techniques',
      title: 'Techniques Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'materials',
      title: 'Materials',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Collection',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      season: 'season',
      media: 'mainImage',
      status: 'status',
    },
    prepare(selection) {
      const { title, season, status } = selection
      return {
        ...selection,
        subtitle: `${season?.toUpperCase()} • ${status}`,
      }
    },
  },
  orderings: [
    {
      title: 'Season, Newest First',
      name: 'seasonDesc',
      by: [
        { field: 'year', direction: 'desc' },
        { field: 'season', direction: 'desc' },
      ],
    },
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
