import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool, defineDocuments, defineLocations} from 'sanity/presentation'
import {visionTool} from '@sanity/vision'
import {assist} from '@sanity/assist'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {structure} from './structure'
import {schemaTypes} from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '0mlp51cg'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const apiVersion = process.env.SANITY_STUDIO_API_VERSION || '2024-11-20'
const studioUrl = process.env.SANITY_STUDIO_URL || 'http://localhost:3333'
const previewUrl = process.env.SANITY_STUDIO_PREV_URL || 'http://localhost:3000'

const homeLocation = {
  title: 'Home',
  href: '/',
}

function resolveHref(documentType, slug) {
  switch (documentType) {
    case 'page':
      return slug ? `/${slug}` : undefined
    case 'post':
      return slug ? `/posts/${slug}` : undefined
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}

export default defineConfig({
  name: 'default',
  title: 'swaybae-sanity',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure,
    }),
    presentationTool({
      previewUrl: {
        origin: previewUrl,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: '/:slug',
            filter: `_type == "page" && slug.current == $slug`,
          },
          {
            route: '/posts/:slug',
            filter: `_type == "post" && slug.current == $slug`,
          },
        ]),

        locations: {
          settings: defineLocations({
            locations: [homeLocation],
            message: 'This document is used on all pages',
            tone: 'caution',
          }),
          page: defineLocations({
            select: {title: 'title', slug: 'slug.current'},
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: resolveHref('page', doc?.slug),
                },
              ],
            }),
          }),
          post: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: resolveHref('post', doc?.slug),
                },
                {title: 'Home', href: `/`},
              ].filter(Boolean),
            }),
          }),
        },
      },
    }),
    visionTool({defaultApiVersion: apiVersion}),
    unsplashImageAsset(),
    assist(),
  ],

  schema: {
    types: schemaTypes,
  },
})
