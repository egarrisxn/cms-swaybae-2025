import {defineCliConfig} from 'sanity/cli'
import {projectId, dataset} from './lib/api.js'

export default defineCliConfig({
  api: {
    projectId: projectId || '0mlp51cg',
    dataset: dataset || 'production',
  },
  studioHost: 'swaybae-2025',
  autoUpdates: true,
})
