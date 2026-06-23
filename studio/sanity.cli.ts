import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '<your project ID>'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineCliConfig({
  api: {
    projectId: projectId,
    dataset: dataset,
  },
  studioHost: process.env.SANITY_STUDIO_STUDIO_HOST || '',
  deployment: { autoUpdates: false, appId: 'mh6wpjpft4fn6wox6zgbo5i6' },
  typegen: {
    path: './src/**/*.{ts,tsx,js,jsx}',
    schema: 'schema.json',
    generates: './sanity.types.ts',
    overloadClientMethods: true,
  },
})
