import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Cinch Lab CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'YOUR_PROJECT_ID',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Collections')
              .child(
                S.documentTypeList('collection')
                  .title('Collections')
                  .filter('_type == "collection"')
                  .defaultOrdering([{ field: 'year', direction: 'desc' }])
              ),
            S.divider(),
            S.listItem()
              .title('Lab Experiments')
              .child(
                S.documentTypeList('experiment')
                  .title('Experiments')
                  .filter('_type == "experiment"')
                  .defaultOrdering([{ field: 'startDate', direction: 'desc' }])
              ),
            S.divider(),
            S.listItem()
              .title('Archive Entries')
              .child(
                S.documentTypeList('archive')
                  .title('Archive')
                  .filter('_type == "archive"')
                  .defaultOrdering([{ field: 'date', direction: 'desc' }])
              ),
            S.divider(),
            S.listItem()
              .title('Brand Analysis')
              .child(
                S.documentTypeList('analysis')
                  .title('Analysis')
                  .filter('_type == "analysis"')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
