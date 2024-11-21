import {defineDocuments, defineLocations} from 'sanity/presentation'

export const homeLocation = {
  title: 'Home',
  href: '/',
}

export function resolveHref(documentType, slug) {
  switch (documentType) {
    case 'page':
      return slug ? `/${slug}` : undefined
    case 'post':
      return slug ? `/blog/${slug}` : undefined
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}

export const resolve = {
  mainDocuments: defineDocuments([
    {
      route: '/:slug',
      filter: `_type == "page" && slug.current == $slug`,
    },
    {
      route: '/blog/:slug',
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
}
