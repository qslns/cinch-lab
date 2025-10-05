import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'analysis',
  title: 'Brand Analysis',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Analysis ID',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^ANALYSIS_\d{3}$/, {
        name: 'analysis-id',
        invert: false,
      }).error('Must be in format: ANALYSIS_001'),
    }),
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'brandName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'collectionName',
      title: 'Collection / Season',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required().min(2000).max(2030),
    }),
    defineField({
      name: 'verdict',
      title: 'Critical Verdict',
      type: 'string',
      options: {
        list: [
          { title: 'GENIUS', value: 'genius' },
          { title: 'PROGRESSIVE', value: 'progressive' },
          { title: 'COMPETENT', value: 'competent' },
          { title: 'COMMERCIAL', value: 'commercial' },
          { title: 'DERIVATIVE', value: 'derivative' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'overallRating',
      title: 'Overall Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).max(10).precision(1),
    }),
    defineField({
      name: 'ratings',
      title: 'Detailed Ratings',
      type: 'object',
      fields: [
        {
          name: 'innovation',
          title: 'Innovation',
          type: 'number',
          validation: (Rule) => Rule.required().min(0).max(10),
        },
        {
          name: 'execution',
          title: 'Execution',
          type: 'number',
          validation: (Rule) => Rule.required().min(0).max(10),
        },
        {
          name: 'concept',
          title: 'Concept',
          type: 'number',
          validation: (Rule) => Rule.required().min(0).max(10),
        },
        {
          name: 'technique',
          title: 'Technique',
          type: 'number',
          validation: (Rule) => Rule.required().min(0).max(10),
        },
      ],
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
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
      name: 'referenceImages',
      title: 'Reference Images',
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
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'detailedAnalysis',
      title: 'Detailed Analysis',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'strengths',
      title: 'Strengths',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'weaknesses',
      title: 'Weaknesses',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'techniques',
      title: 'Notable Techniques',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'influences',
      title: 'Identified Influences',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Analysis',
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
      brandName: 'brandName',
      collectionName: 'collectionName',
      verdict: 'verdict',
      rating: 'overallRating',
      media: 'mainImage',
    },
    prepare(selection) {
      const { brandName, collectionName, verdict, rating } = selection
      return {
        ...selection,
        title: `${brandName} • ${collectionName}`,
        subtitle: `${verdict?.toUpperCase()} • ${rating}/10`,
      }
    },
  },
  orderings: [
    {
      title: 'Date, Newest First',
      name: 'dateDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Rating, Highest First',
      name: 'ratingDesc',
      by: [{ field: 'overallRating', direction: 'desc' }],
    },
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
