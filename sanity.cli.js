import {defineCliConfig} from 'sanity/cli'

export const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '0mlp51cg'

export const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: 'swaybae-2025',
  autoUpdates: true,
})
