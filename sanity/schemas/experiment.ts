import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'experiment',
  title: 'Lab Experiments',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Experiment ID',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^EXP_\d{3}$/, {
        name: 'experiment-id',
        invert: false,
      }).error('Must be in format: EXP_001'),
    }),
    defineField({
      name: 'title',
      title: 'Experiment Title',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Deconstruction', value: 'deconstruction' },
          { title: 'Material Research', value: 'material' },
          { title: 'Hybrid Construction', value: 'hybrid' },
          { title: 'Process Innovation', value: 'process' },
          { title: 'Volume Manipulation', value: 'volume' },
          { title: 'Technical Study', value: 'technique' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
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
          { title: 'Failed', value: 'failed' },
        ],
        layout: 'radio',
      },
      initialValue: 'in_progress',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'completionDate',
      title: 'Completion Date',
      type: 'date',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'objective',
      title: 'Experiment Objective',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'techniques',
      title: 'Techniques Applied',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'materials',
      title: 'Materials Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Documentation Image',
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
      ],
    }),
    defineField({
      name: 'processImages',
      title: 'Process Documentation',
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
              name: 'step',
              type: 'string',
              title: 'Process Step',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'result',
      title: 'Result / Outcome',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'learnings',
      title: 'Key Learnings',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'progressPercentage',
      title: 'Progress (%)',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(100),
      initialValue: 0,
    }),
    defineField({
      name: 'relatedExperiments',
      title: 'Related Experiments',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'experiment' }] }],
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
      category: 'category',
      status: 'status',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, id, category, status } = selection
      return {
        ...selection,
        title: `${id} • ${title}`,
        subtitle: `${category} • ${status}`,
      }
    },
  },
  orderings: [
    {
      title: 'Experiment ID',
      name: 'idAsc',
      by: [{ field: 'id', direction: 'asc' }],
    },
    {
      title: 'Date, Newest First',
      name: 'dateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
