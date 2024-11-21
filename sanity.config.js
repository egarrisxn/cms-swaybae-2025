import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'
import {visionTool} from '@sanity/vision'
import {assist} from '@sanity/assist'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {structure} from './lib/structure'
import {schemaTypes} from './schemaTypes'
import {projectId, dataset, apiVersion, previewUrl} from './lib/api'
import * as resolve from './lib/resolve'

export default defineConfig({
  name: 'default',
  title: 'swaybae-sanity',

  projectId: projectId || '0mlp51cg',
  dataset: dataset || 'production',

  plugins: [
    structureTool({
      structure,
    }),
    presentationTool({
      previewUrl: {
        origin: previewUrl || 'http://localhost:3000',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      resolve,
    }),
    visionTool({defaultApiVersion: apiVersion}),
    unsplashImageAsset(),
    assist(),
  ],

  schema: {
    types: schemaTypes,
  },
})
