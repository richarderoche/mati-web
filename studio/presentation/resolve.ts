import {
  defineDocuments,
  type PresentationPluginOptions,
} from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  mainDocuments: defineDocuments([
    {
      route: '/',
      type: 'home',
    },
    {
      route: '/articles/:slug',
      filter: `(_type == "article" || _type == "farmerStory") && slug.current == $slug`,
    },
    {
      route: '/:slug',
      filter: `_type == "page" && slug.current == $slug`,
    },
  ]),
}
