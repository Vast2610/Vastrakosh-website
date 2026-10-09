import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemas'
import {projectId, dataset} from './project'

export default defineConfig({
  name: 'vastrakosh',
  title: 'Vastrakosh',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Shop')
          .items([
            S.listItem()
              .title('Sarees')
              .child(S.documentTypeList('saree').title('Sarees').defaultOrdering([{field: 'order', direction: 'asc'}])),
          ]),
    }),
  ],
  schema: {types: schemaTypes},
})
