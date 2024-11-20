import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {projectId, dataset} from './lib/api.js'

export default defineConfig({
  name: 'default',
  title: 'swaybae-sanity',

  projectId: projectId || '0mlp51cg',
  dataset: dataset || 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
