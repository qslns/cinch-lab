import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'archive',
  title: 'Archive Entries',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Archive ID',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^ARC_\d{3}$/, {
        name: 'archive-id',
        invert: false,
      }).error('Must be in format: ARC_001'),
    }),
    defineField({
      name: 'title',
      title: 'Entry Title',
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
      name: 'type',
      title: 'Entry Type',
      type: 'string',
      options: {
        list: [
          { title: 'Inspiration', value: 'inspiration' },
          { title: 'Iteration', value: 'iteration' },
          { title: 'Failure', value: 'failure' },
          { title: 'Breakthrough', value: 'breakthrough' },
          { title: 'Process Note', value: 'process' },
          { title: 'Philosophy', value: 'philosophy' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Documentation Images',
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
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'relatedCollection',
      title: 'Related Collection',
      type: 'reference',
      to: [{ type: 'collection' }],
    }),
    defineField({
      name: 'relatedExperiment',
      title: 'Related Experiment',
      type: 'reference',
      to: [{ type: 'experiment' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Entry',
      type: 'boolean',
      initialValue: false,
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
      id: 'id',
      type: 'type',
      date: 'date',
      media: 'images.0',
    },
    prepare(selection) {
      const { title, id, type, date } = selection
      return {
        ...selection,
        title: `${id} • ${title}`,
        subtitle: `${type} • ${date}`,
      }
    },
  },
  orderings: [
    {
      title: 'Date, Newest First',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Type',
      name: 'typeAsc',
      by: [{ field: 'type', direction: 'asc' }],
    },
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
